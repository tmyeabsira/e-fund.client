import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from './api';
import LoadingSpinner from './LoadingSpinner';
import { jwtDecode } from 'jwt-decode';

const BlogsDetails = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [blog, setBlog] = useState(null);
  const [blogComments, setBlogComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const baseURL = 'https://localhost:7062';

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`/api/blog/GetBlog/${id}`);
        console.log('Blog response:', response.data);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog details', error);
      }
    };

    const fetchBlogComments = async () => {
      try {
        const response = await axios.get(`/api/blogcomment/GetAllBlogscomments/${id}`);
        console.log('Comments response:', response.data.$values);
        setBlogComments(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('user');
      if (token) {
        const decodedToken = jwtDecode(token);
        const UserName = decodedToken.sub;
        try {
          const response = await axios.get(`/api/User/GetUserByName?UserName=${UserName}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('User response:', response.data);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching user', error);
        }
      }
    };

    fetchBlogDetails();
    fetchBlogComments();
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingComment) {
        await axios.put(`/api/blogcomment/UpdateBlogComment/${editingComment.id}`, { content });
        setEditingComment(null);
      } else {
        await axios.post('/api/blogcomment/CreateBlogComment', { BlogId: id, Content: content, UserId: user.id });
      }
      setContent('');
      const response = await axios.get(`/api/blogcomment/GetAllBlogscomments/${id}`);
      setBlogComments(response.data.$values);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setContent(comment.content);
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`/api/blogcomment/DeleteBlogComment/${commentId}`);
      const response = await axios.get(`/api/blogcomment/GetAllBlogscomments/${id}`);
      setBlogComments(response.data.$values);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className=" px-4 mx-auto max-w-screen-xl">
          <h1 className="text-3xl text-center font-bold mb-4">{blog?.title}</h1>
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="">
              {blog?.pictureUrl && (
                <img
                  src={`${baseURL}${blog.pictureUrl}`}
                  alt={blog.title}
                  className="mt-4 w-full h-auto rounded-lg"
                />
              )}
             <div className="text-gray-700 mb-6">
  {blog?.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      <p>{line}</p>
      <br />
    </React.Fragment>
  ))}
</div>


            </div>
          </article>
        </div>
      </main>
      
    </>
  );
};

export default BlogsDetails;
