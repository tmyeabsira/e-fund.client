import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './api';
import { jwtDecode } from 'jwt-decode';
import { useDropzone } from 'react-dropzone';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, goalAmount } = location.state || {};

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/*',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      setError('Please fill out all fields and select an image.');
      return;
    }

    const IntGoalAmount = parseInt(goalAmount);
    const token = localStorage.getItem('user');
    const username = jwtDecode(token).sub;
    const formData = new FormData();
    formData.append('UserName', username);
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('CategoryName', category);
    formData.append('GoalAmount', IntGoalAmount);
    formData.append('Picture', file);

    try {
      const response = await axios.post('/api/fundraiser/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('user')}`,
        },
      });

      console.log('Fundraiser created successfully:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating fundraiser:', error);
      setError('Error creating fundraiser');
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="">
        <div className="relative w-full h-80 mb-2">
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-blue-800">
            <h1 className="text-4xl font-semibold mb-2">You are almost there!</h1>
            <p className="text-lg">Fill out the details of your fundraiser.</p>
          </div>
        </div>
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white"></h2>
        <form onSubmit={handleSubmit} className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Fundraiser Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type fundraiser title"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                Fundraiser image
              </label>
              <div {...getRootProps()} className="flex justify-between mt-10">
                <div
                  className={`p-6 m-3 border-dashed border-2 border-gray-300 rounded-md cursor-pointer ${
                    isDragActive ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-gray-700 text-lg">
                      {isDragActive ? 'Drop the file here ...' : 'Drag and drop a file here, or click to select a file'}
                    </p>
                    <em className="text-gray-500">Only image files are allowed</em>
                  </div>
                </div>
                {file && (
                  <aside className="mt-4">
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-64 rounded-lg shadow-lg"
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                    />
                  </aside>
                )}
              </div>
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create Fundraiser
          </button>
        </form>
      </div>
    </section>
  );
};

export default Details;
