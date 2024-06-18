import React, { useEffect, useState } from 'react';
import axios from './api';
import { jwtDecode } from 'jwt-decode';


const ProfilePictureUpload = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null); 

  useEffect(()=>{
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
            setPreview(`https://localhost:7062${userResponse.data.user.ProfilePicture}`);
    }

    fetchUser()
  },[])

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!profilePicture) {
      setMessage('Please select a profile picture.');
      return;
    }

    const token = localStorage.getItem('user');
    if (!token) {
      setMessage('No token found');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userName = decodedToken.sub; 

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userName', userName);

    try {
      const response = await axios.post('https://localhost:7062/api/user/UploadProfilePicture', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Profile picture uploaded successfully.');
      setPreview(`https://localhost:7062${response.data.ProfilePicture}`);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setMessage('Failed to upload profile picture.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Profile Picture</h2>
      {message && <div className="mb-4 text-center text-blue-500">{message}</div>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          {preview ? (
            <img src={preview} alt="Profile Preview" className="w-24 h-24 rounded-full mb-4" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          <input type="file" onChange={handlePictureChange} className="mb-4" />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePictureUpload;
