// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "./api";
// import LoadingSpinner from "./LoadingSpinner";
// import BlogCard from "./BlogCard";
// import BlogComment from "./BlogComment";
// import { jwtDecode } from "jwt-decode";

// const BlogsDetails = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [comment, setComment] = useState("");
//   const baseURL = "https://localhost:7062";

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const response = await axios.get(`/api/blog/GetBlog/${id}`);
//         setBlog(response.data);
//       } catch (error) {
//         console.error("Error fetching blog details", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogDetails();
//   }, [id]);

//   useEffect(() => {
//     const fetchRecentBlogs = async () => {
//       try {
//         const response = await axios.get("/api/blog/GetAllBlogs");
//         setRecentBlogs(response.data.$values);
//       } catch (error) {
//         console.error("Error fetching recent blogs", error);
//       }
//     };

//     fetchRecentBlogs();
//   }, []);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('user');
//       if (!token) {
//         throw new Error('No token found');
//       }
//       const decodedToken = jwtDecode(token);
//       const UserName = decodedToken.sub;
//       const userResponse = await axios.get(`/api/User/GetUserByName?UserName=${UserName}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       setUser(userResponse.data.user);

//       await axios.post(`/api/blogcomment/createblogcomment`, {
//         BlogId: parseInt(id, 10),
//         UserId: user.id,
//         Content: comment
//       });

//       setComment("");
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.data); // Server responded with a status code outside the range of 2xx
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         console.log(error.request); // No response was received
//       } else {
//         console.log('Error', error.message); // Something else happened
//       }
//     }
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto bg-white overflow-hidden p-6">
//         <div className="flex items-center mb-6">
//           <img
//             className="w-16 h-16 rounded-full object-cover"
//             src={`${baseURL}${blog.user.profilePicture}`}
//             alt={blog.user.userName}
//           />
//           <div className="ml-4">
//             <p className="text-xl font-bold">{blog.user.userName}</p>
//             <p className="text-gray-500">
//               {new Date(blog.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//         <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//         {blog.pictureUrl && (
//           <div className="mb-6">
//             <img
//               src={`${baseURL}${blog.pictureUrl}`}
//               alt={blog.title}
//               className="w-full h-auto rounded-lg"
//             />
//           </div>
//         )}
//         <div className="prose max-w-none mb-8">
//           {blog.content.split("\n").map((line, index) => (
//             <React.Fragment key={index}>
//               <p>{line}</p>
//               <br />
//             </React.Fragment>
//           ))}
//         </div>
//         <div className="border-t pt-6">
//           <h3 className="text-2xl font-semibold mb-4">Comments</h3>
//           <div className="mb-4">
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Write your comment here..."
//                 className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                 rows="4"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Comment
//               </button>
//             </form>
//           </div>
//           <BlogComment blogId={id} />
//         </div>
//       </div>
//       <div className="mt-8">
//         <div className="max-w-4xl mx-auto p-4">
//           <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recentBlogs.slice(0, 3).map((recentBlog) => (
//               <BlogCard key={recentBlog.id} Blog={recentBlog} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogsDetails;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./api";
import LoadingSpinner from "./LoadingSpinner";
import BlogCard from "./BlogCard";
import BlogComment from "./BlogComment";
import { jwtDecode } from "jwt-decode";

const BlogsDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentPosted, setCommentPosted] = useState(false); // New state to trigger re-fetch
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

  useEffect(() => {
    if (commentPosted) {
      setCommentPosted(false);
    }
  }, [commentPosted]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
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

      await axios.post(`/api/blogcomment/createblogcomment`, {
        BlogId: parseInt(id, 10),
        UserId: user.id,
        Content: comment
      });

      setComment("");
      setCommentPosted(true); // Trigger re-fetching of comments
    } catch (error) {
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

  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white overflow-hidden p-6">
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
        <div className="flex">
          <div className="pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
          </div>
          <p className="text-gray-600 mb-6">{readingTime} min read</p>
        </div>
        {blog.pictureUrl && (
          <div className="mb-6">
            <img
              src={`${baseURL}${blog.pictureUrl}`}
              alt={blog.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        <div className="prose max-w-none mb-8">
          {blog.content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              <p>{line}</p>
              <br />
            </React.Fragment>
          ))}
        </div>
        <div className="border-t pt-6">
          <h3 className="text-2xl font-semibold mb-4">Comments</h3>
          <div className="mb-4">
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                rows="4"
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Comment
              </button>
            </form>
          </div>
          <BlogComment blogId={id} commentPosted={commentPosted} />
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-5xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentBlogs.slice(0, 3).map((recentBlog) => (
              <BlogCard key={recentBlog.id} Blog={recentBlog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
