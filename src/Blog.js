import React, { useEffect, useState } from "react";
import axios from "./api";
import LoadingSpinner from "./LoadingSpinner";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [Blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blog/GetAllBlogs");
        setBlog(response.data.$values);
        console.log(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto max-w-9xl">
          <h1 className="text-2xl font-bold mb-8">Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Blog.map((Blog) => (
              <BlogCard key={Blog.id} Blog={Blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
