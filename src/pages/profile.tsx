import React, { useState } from "react";

const ProfilePage: React.FC = () => {
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
    email: "user@example.com",
    companyName: "",
    companyCategory: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile Updated!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-black mb-4">Your Profile</h1>
      <form onSubmit={handleSubmit}>
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
