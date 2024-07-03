import React, { useState, useCallback } from "react";
import axios from "./api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDropzone } from "react-dropzone";
const BlogCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    // Only take the first file even if multiple files are dropped
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
    multiple: false, // Ensure only one file is accepted
    accept: "image/*", // Optional: accept images only
  });

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("user");
    const username = jwtDecode(token).sub;
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Title", title);
    formData.append("Content", content);
    formData.append("PictureUrl", file);

    try {
      const response = await axios.post("/api/blog/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/Blogs");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError("Error creating blog");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          You are almost There
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Blog Title
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
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <textarea
                id="description"
                rows="8"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                required
              />
            </div>
            <div className="">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Blog image
              </label>
              {/* <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={handleImageChange}
                  required
                /> */}
              <div {...getRootProps()} className="flex justify-between mt-10">
                <div
                  className={`p-6 m-3 border-dashed border-2 border-gray-300 rounded-md cursor-pointer ${
                    isDragActive ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-gray-700 text-lg">
                      {isDragActive
                        ? "Drop the file here ..."
                        : "Drag 'n' drop a file here, or click to select a file"}
                    </p>
                    <em className="text-gray-500">
                      Only image files are allowed
                    </em>
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
            Create Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default BlogCreate;
