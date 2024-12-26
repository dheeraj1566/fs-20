// import { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { Link, useNavigate } from "react-router-dom";

// function Profile() {
//   const [data, setData] = useState({});
//   const [message, setMessage] = useState(null);
//   const [changes, setChanges] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     try {
//       const response = await instance.get("/user/profile", {
//         withCredentials: true,
//       });
//       console.log(response.data);
//       setData(response.data);
//     } catch (error) {
//       console.log(error);
//       setData({});
//     }
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//     setChanges(true);
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const response = await instance.put("/user/profile", data);
//     if (response.status === 200) {
//       navigate("/profile?success=true");
//     }
//   }

//   return (
//     <>
//       {message && (
//         <h3 className="text-center text-red-500 font-semibold">{message}</h3>
//       )}
//       <div
//         id="profile"
//         className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 min-h-screen"
//       >
//         <aside className="bg-white shadow-md rounded-md p-4 w-full md:w-1/3">
//           <ul className="space-y-4">
//             <li className="active">
//               <Link
//                 className="block text-blue-600 font-medium hover:text-blue-800"
//               >
//                 Personal Details
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block text-gray-600 hover:text-blue-800 font-medium"
//               >
//                 Wishlist
//               </Link>
//             </li>
//             <li>
//               <Link
//                 className="block text-gray-600 hover:text-blue-800 font-medium"
//               >
//                 My Orders
//               </Link>
//             </li>
//             {data.role === "seller" && (
//               <li>
//                 <Link
//                   to={`/my-products/${data._id}`}
//                   className="block text-gray-600 hover:text-blue-800 font-medium"
//                 >
//                   My Products
//                 </Link>
//               </li>
              
//             )}
//           </ul>
//         </aside>
//         <main className="bg-white shadow-md rounded-md p-4 w-full md:w-2/3">
//           {data.name && (
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Your name"
//                   value={data.name}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Your email"
//                   value={data.email}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Your phone"
//                   value={data.phone}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Your username"
//                   value={data.username}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//                 />
//               </div>

//               <div className="form-group">
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Role
//                 </label>
//                 <select
//                   name="role"
//                   value={data.role}
//                   onChange={handleChange}
//                   className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//                 >
//                   <option value="buyer">Buyer</option>
//                   <option value="seller">Seller</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <button
//                   type="submit"
//                   disabled={!changes}
//                   className={`w-full bg-blue-600 text-white p-2 rounded-md ${
//                     changes ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
//                   }`}
//                 >
//                   Save Details
//                 </button>
//               </div>
//             </form>
//           )}
//         </main>
//       </div>
//     </>
//   );
// }

// export default Profile;


import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null);
  const [changes, setChanges] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await instance.get("/user/profile", {
        withCredentials: true,
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
      setData({});
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setChanges(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await instance.put("/user/profile", data);
    if (response.status === 200) {
      navigate("/profile?success=true");
    }
  }

  return (
    <>
      {message && (
        <h3 className="text-center text-red-500 font-semibold">{message}</h3>
      )}
      <div
        id="profile"
        className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 min-h-screen"
      >
        <aside className="bg-white shadow-md rounded-md p-4 w-full md:w-1/3">
          <ul className="space-y-4">
            <li className="active">
              <Link
                className="block text-blue-600 font-medium hover:text-blue-800"
              >
                Personal Details
              </Link>
            </li>
            <li>
              <Link
                className="block text-gray-600 hover:text-blue-800 font-medium"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                className="block text-gray-600 hover:text-blue-800 font-medium"
              >
                My Orders
              </Link>
            </li>
            {data.role === "seller" && (
              <>
                <li>
                  <Link
                    to={`/my-products/${data._id}`}
                    className="block text-gray-600 hover:text-blue-800 font-medium"
                  >
                    My Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-coupon"
                    className="block text-gray-600 hover:text-blue-800 font-medium"
                  >
                    Add Coupon
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>
        <main className="bg-white shadow-md rounded-md p-4 w-full md:w-2/3">
          {data.name && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="block font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="form-group">
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="form-group">
                <label className="block font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your phone"
                  value={data.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="form-group">
                <label className="block font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={data.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="form-group">
                <label className="block font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={data.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={!changes}
                  className={`w-full bg-blue-600 text-white p-2 rounded-md ${
                    changes ? "hover:bg-blue-700" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Save Details
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </>
  );
}

export default Profile;
