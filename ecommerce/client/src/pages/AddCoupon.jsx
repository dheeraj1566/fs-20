import { useState } from "react";
import instance from "../axiosConfig";

function AddCoupon() {
  const [data, setData] = useState({
    name: "",
    code: "",
    expiryDate: "",
    minPrice: "",
    discountPercentage: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await instance.post("/createCoupon/create", data, {
        withCredentials: true,
      });
      if (response.status === 201) {
        setMessage("Coupon created successfully.");
        setData({
          name: "",
          code: "",
          expiryDate: "",
          minPrice: "",
          discountPercentage: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "An error occurred while creating the coupon."
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Coupon</h1>
      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Code</label>
          <input
            type="text"
            name="code"
            value={data.code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={data.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Minimum Price</label>
          <input
            type="number"
            name="minPrice"
            value={data.minPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Discount Percentage</label>
          <input
            type="number"
            name="discountPercentage"
            value={data.discountPercentage}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            required
            min="0"
            max="100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Coupon
        </button>
      </form>
    </div>
  );
}

export default AddCoupon;
