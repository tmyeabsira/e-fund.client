import React, { useState, useEffect } from "react";
import axios from "./api";
import LoadingSpinner from "./LoadingSpinner";
import { formatDistanceToNow } from "date-fns";

const BlogComment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              className="p-4 border rounded-lg shadow-md"
            >
              <div className="flex items-center mb-2">
                <div className="font-bold">{comment.user.userName}</div>
                <div className="text-gray-500 ml-2">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </div>{" "}
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
