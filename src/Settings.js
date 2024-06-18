import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfilePictureUpload from "./ProfilePictureUpload";
import axios from "./api";
import { useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";

const Settings = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [publicApi, setPublicApi] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Fetch user details
    
    const fetchUser = async ()=>{
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
            setUser(userResponse.data.user)
            console.log(userResponse.data.user)
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setPublicApi(user.publicApi);
            setPreview(`https://localhost:7062${user.ProfilePicture}`);
      }
  
      fetchUser()
  }, []);

  

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("FirstName", firstName);
      formData.append("LastName", lastName);
      formData.append("PublicApi", publicApi);
      if (profilePicture) {
        formData.append("ProfilePicture", profilePicture);
      }

      const response = await axios.put(`/api/user/update/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      enqueueSnackbar("Settings updated successfully", { variant: "success" });
    } catch (error) {
      console.error("Error updating settings", error);
      enqueueSnackbar("Error updating settings", { variant: "error" });
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!profilePicture) {
//       setMessage('Please select a profile picture.');
//       return;
//     }

//     const token = localStorage.getItem('user');
//     if (!token) {
//       setMessage('No token found');
//       return;
//     }

//     const decodedToken = jwtDecode(token);
//     const userName = decodedToken.sub; 

//     const formData = new FormData();
//     formData.append('profilePicture', profilePicture);
//     formData.append('userName', userName);

//     try {
//       const response = await axios.post('https://localhost:7062/api/user/UploadProfilePicture', formData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setMessage('Profile picture uploaded successfully.');
//       setPreview(`https://localhost:7062${response.data.ProfilePicture}`);
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//       setMessage('Failed to upload profile picture.');
//     }
//   };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">
          Account
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Profile Picture
          </h2>
          <div className="flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-semibold mb-4">
              Upload Profile Picture
            </h2>
            {message && (
              <div className="mb-4 text-center text-blue-500">{message}</div>
            )}
            <form
              className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex flex-col items-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                <input
                  type="file"
                  onChange={handlePictureChange}
                  className="mb-4"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Personal Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-4">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="First Name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Last Name"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label
              htmlFor="publicApi"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Public API
            </label>
            <input
              type="text"
              id="publicApi"
              value={publicApi}
              onChange={(e) => setPublicApi(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Public API"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
            >
              <span className="sr-only">Back</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 16.293a1 1 0 010-1.414L15.586 12H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-blue-700 dark:bg-blue-800 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
