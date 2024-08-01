import React, { useState, useEffect } from "react";
import axios from "./api";
import LoadingSpinner from "./LoadingSpinner";

const BlogComment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "https://localhost:7062";

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/api/blogcomment/GetBlogComments/${blogId}`
        );
        setComments(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  const CalculateTimeDifferences = (givenTime) => {
    const givenDate = new Date(givenTime);
    const currentDate = new Date();

    const timeDifference = currentDate - givenDate;

    // Convert milliseconds to seconds, minutes, hours, and days
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}h ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
}


  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.blogCommentId}
              className="p-4 border rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 pr-2 rounded-full object-cover"
                    src={`${baseURL}${comment.user.profilePic}`}
                    alt={comment.user.userName}
                  />
                  <div className="font-bold">{comment.user.userName}</div>
                </div>
                <div className="text-gray-500 ml-2">
                  {CalculateTimeDifferences(comment.createdAt)}
                </div>
              </div>
              <div>{comment.content}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogComment;
