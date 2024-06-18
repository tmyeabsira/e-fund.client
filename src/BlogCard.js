import { jwtDecode } from 'jwt-decode';
import axios from './api';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BlogCard = ({ Blog }) => {
  const navigate = useNavigate();
  const baseURL = 'https://localhost:7062';

  useEffect(() => {
    
  }, [Blog.id]);

 

  return (
    <>
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/Blogs/${Blog.blogId}`}>
        {Blog.pictureUrl && (
          <img
            src={`${baseURL}${Blog.pictureUrl}`}
            alt={Blog.title}
            className="mt-4 w-full h-auto rounded-lg"
          />
        )}
      </Link>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{Blog.title}</h5>
        </a>
      </div>
    </div>
    </>
  );
};

export default BlogCard;
