import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ Blog }) => {
  const baseURL = "https://localhost:7062";
  const blogContent = String(Blog.content);

  return (
    <>
      <Link to={`/blogs/${Blog.blogId}`} className="hover:shadow-md hover:rounded-md">
      <div className="flex items-start space-x-4 p-4 rounded-lg">
        <div className="w-16 h-16">
          {Blog.pictureUrl && (
            <img
              src={`${baseURL}${Blog.pictureUrl}`}
              alt={Blog.title}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h2 className="text-xl font-bold truncate">{Blog.title}</h2>
          <p className="text-gray-700 truncate">{blogContent.slice(0, 100)}...</p>
          <p className="text-gray-500 text-sm">
            By {Blog.user.userName} on {new Date(Blog.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-4">
            <a
              href={`/blogs/${Blog.id}`}
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              Read more
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default BlogCard;
