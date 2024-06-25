import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./api";
import LoadingSpinner from "./LoadingSpinner";
import BlogCard from "./BlogCard";
import { jwtDecode } from "jwt-decode";
import BlogComment from "./BlogComment";

const BlogsDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const baseURL = "https://localhost:7062";

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/api/blog/GetBlog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/GetAllBlogs");
        setRecentBlogs(response.data.$values);
      } catch (error) {
        console.error("Error fetching recent blogs", error);
      }
    };

    fetchRecentBlogs();
  }, []);

  const handleCommentChange = async(e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('user');
        if (!token) {
          throw new Error('No token found');
        }
      const decodedToken = jwtDecode(token);
        const UserName = decodedToken.sub;
        const userResponse = await axios.get(`/api/User/GetUserByName?UserName=${UserName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(userResponse.data.user);

       
      await axios.post(`/api/blogcomment/createblogcomment`, {BlogId: parseInt(id,10), UserId: user.id,Content:comment});

    } catch(error) {
      if (error.response) {
        console.log(error.response.data); // Server responded with a status code outside the range of 2xx
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request); // No response was received
      } else {
        console.log('Error', error.message); // Something else happened
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={`${baseURL}${blog.user.profilePicture}`}
            alt={blog.user.userName}
          />
          <div className="ml-4">
            <p className="text-xl font-bold">{blog.user.userName}</p>
            <p className="text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="mb-6">
          {blog.pictureUrl && (
            <img
              src={`${baseURL}${blog.pictureUrl}`}
              alt={blog.title}
              className="w-auto h-auto rounded-lg"
            />
          )}
        </div>
        <div className="prose max-w-none">
          {blog?.content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              <p>{line}</p>
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        <div className="flex ">
          <div className="comment-form">
            <form className="">
              <lable>Comment</lable>
              <input type="textarea" placeholder="Write your comment here..."
              onChange={(e) => setComment(e.target.value)}/>
              <button onClick={handleCommentChange} className="bg-blue-800 px-4 py-2">Comment</button>
            </form>
          </div>
          <BlogComment blogId={id} />
        </div>
      </div>
      <div className="w-full bg-[#639fff6e]">
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.slice(0,3).map((recentBlog) => (
              <BlogCard key={recentBlog.id} Blog={recentBlog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
