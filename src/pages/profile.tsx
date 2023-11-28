import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useUser } from "../lib/UserContext";
import { UPDATE_PROFILE_MUTATION } from "../lib/queries";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();

  useEffect(() => {
    if (user) {
      setUserData({
        email: user.email,
        companyName: user.companyName,
        companyCategory: user.companyCategory,
        description: user.description,
      });
    }
  }, [user]);

  const sectors = [
    "Technology",
    "Healthcare",
    "Finance",
    "Manufacturing",
    "Retail",
    "Education",
    "Real Estate",
    "Transportation",
    "Entertainment",
    "Agriculture",
    "Energy",
    "Food & Beverage",
    "Legal",
    "Non-Profit",
    "Construction",
    "Marketing",
    "Hospitality",
    "Other",
  ];

  const [userData, setUserData] = useState({
    email: "",
    companyName: "",
    companyCategory: "",
    description: "",
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please fill out all fields");
      return;
    }

    if (!user || !user.id) {
      return;
    }

    try {
      const { data } = await updateProfile({
        variables: {
          userId: user.id,
          companyName: userData.companyName,
          companyDescription: userData.description,
          companyCategory: userData.companyCategory,
        },
      });

      alert("Profile updated successfully!");

      if (data.updateProfile) {
        updateUser({
          ...user,
          companyName: data.updateProfile.companyName,
          description: data.updateProfile.companyDescription,
          companyCategory: data.updateProfile.companyCategory,
        });
      }
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  const isFormValid = () => {
    return userData.companyName && userData.companyCategory && userData.description;
  };

  return (
    <div className="container mx-auto p-4 md:px-10 lg:px-20 xl:px-40">
      <h1 className="text-3xl font-black mb-4 text-center sm:text-left">Your Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto sm:max-w-lg md:max-w-xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="rounded w-full py-2 px-3 text-gray-700"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            placeholder="Enter your company name"
            value={userData.companyName}
            onChange={handleChange}
            className="rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Company Category</label>
          <select
            name="companyCategory"
            value={userData.companyCategory}
            placeholder="Select a category"
            onChange={handleChange}
            className="rounded w-full py-2 px-3 text-gray-700">
            <option value="">Select a Category</option>
            {sectors.map((sector, index) => (
              <option key={index} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={userData.description}
            onChange={handleChange}
            placeholder="Help us by providing a brief description of your company."
            className="rounded w-full py-2 px-3 text-gray-700 h-32"></textarea>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
