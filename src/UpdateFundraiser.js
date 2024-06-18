import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSnackbar } from 'notistack';

const FundraiserUpdateForm = () => {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { fundraiser } = location.state;
  const [title, setTitle] = useState(fundraiser.title);
  const [description, setDescription] = useState(fundraiser.description);
  const [goalAmount, setGoalAmount] = useState(fundraiser.goalAmount);
  const [categoryId, setCategotyId] = useState(fundraiser.categoryId);
  const [picture, setPicture] = useState(null);

  const baseURL = 'https://localhost:7062'

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('GoalAmount', goalAmount);
    formData.append('CategoryId', categoryId);
    if (picture) {
      formData.append('Picture', picture);
    }

    try {
      await axios.put(`${baseURL}/api/fundraiser/update/${fundraiser.id}`, formData);
      enqueueSnackbar("Fundraiser updated successfully.", { variant: 'success' });
      
      // Optionally, refresh data or redirect user
    } catch (error) {
      console.error('Error updating fundraiser', error);
      enqueueSnackbar("Failed to update the fundraiser. Please try again.", { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Update Fundraiser</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Description"
      />
      <input
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Goal Amount"
      />
      <input
        type="number"
        value={categoryId}
        onChange={(e) => setCategotyId(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="Category"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Save
      </button>
    </form>
  );
};

export default FundraiserUpdateForm;
