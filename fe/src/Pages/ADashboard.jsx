import React, { useState, useEffect } from "react";
import axios from "axios";

const ADashboard = () => {
  const [users, setUsers] = useState([]); // For listing users
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
    profilePicture: "",
  }); // For Add form
  const [error, setError] = useState(null); // Error messages
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users from the API
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:2323/users")
      .then((res) => {
        setUsers(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.role ||
      !formData.mobile ||
      !formData.email ||
      !formData.gender ||
      !formData.dob
    ) {
      setError("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:2323/users", formData)
      .then(() => {
        fetchUsers();
        resetForm();
      })
      .catch((err) => setError(err.message));
  };

  // Delete user
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:2323/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => setError(err.message));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      mobile: "",
      email: "",
      address: "",
      gender: "",
      dob: "",
      profilePicture: "",
    });
    setError(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4" >
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      {/* Add User Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="form-control"
                ></textarea>
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  placeholder="Profile Picture URL"
                  className="form-control"
                />
              </div>
            </div>
            <div className="mt-3 text-end">
              <button type="submit" className="btn btn-primary">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User List */}
      <h2 className="mb-3">Users</h2>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  {user.profilePicture && (
                    <img
                      src={user.profilePicture}
                      alt={`${user.name}'s profile`}
                      className="rounded-circle me-3"
                      style={{ width: "60px", height: "60px" }}
                    />
                  )}
                  <div>
                    <h5 className="card-title mb-1">{user.name}</h5>
                    <p className="card-text text-muted">
                      Role: {user.role} | Gender: {user.gender}
                    </p>
                  </div>
                </div>
                <p className="card-text mt-2">Mobile: {user.mobile}</p>
                <p className="card-text">Email: {user.email}</p>
                {user.address && (
                  <p className="card-text">Address: {user.address}</p>
                )}
                <p className="card-text">
                  DOB: {new Date(user.dob).toLocaleDateString()}
                </p>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ADashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ADashboard = () => {
//   const [users, setUsers] = useState([]); // For listing users
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     mobile: "",
//     email: "",
//     address: "",
//     gender: "",
//     dob: "",
//     profilePicture: "",
//   }); // For Add form
//   const [error, setError] = useState(null); // Error messages
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch users from the API
//   const fetchUsers = () => {
//     setLoading(true);
//     axios
//       .get("http://localhost:2323/users")
//       .then((res) => {
//         setUsers(Array.isArray(res.data) ? res.data : []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Handle form inputs
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Add new user
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !formData.name ||
//       !formData.role ||
//       !formData.mobile ||
//       !formData.email ||
//       !formData.gender ||
//       !formData.dob
//     ) {
//       setError("Please fill all required fields");
//       return;
//     }

//     axios
//       .post("http://localhost:2323/users", formData)
//       .then(() => {
//         fetchUsers();
//         resetForm();
//       })
//       .catch((err) => setError(err.message));
//   };

//   // Delete user
//   const deleteUser = (id) => {
//     axios
//       .delete(`http://localhost:2323/users/${id}`)
//       .then(() => {
//         setUsers(users.filter((user) => user.id !== id));
//       })
//       .catch((err) => setError(err.message));
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       role: "",
//       mobile: "",
//       email: "",
//       address: "",
//       gender: "",
//       dob: "",
//       profilePicture: "",
//     });
//     setError(null);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container">
//       <h1>Manage Users</h1>

//       {/* Add User Form */}
//       <form onSubmit={handleSubmit} className="mb-4">
//         <h2>Add User</h2>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="form-control mb-2"
//           required
//         />
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="form-control mb-2"
//           required
//         >
//           <option value="">Select Role</option>
//           <option value="Super Admin">Super Admin</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//         </select>
//         <input
//           type="tel"
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="form-control mb-2"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           className="form-control mb-2"
//           required
//         />
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           className="form-control mb-2"
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input
//           type="date"
//           name="dob"
//           value={formData.dob}
//           onChange={handleChange}
//           className="form-control mb-2"
//           required
//         />
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           placeholder="Address"
//           className="form-control mb-2"
//         ></textarea>
//         <input
//           type="text"
//           name="profilePicture"
//           value={formData.profilePicture}
//           onChange={handleChange}
//           placeholder="Profile Picture URL"
//           className="form-control mb-2"
//         />
//         <button type="submit" className="btn btn-primary me-2">
//           Add
//         </button>
//       </form>

//       {/* User List */}
//       <h2>Users</h2>
//       <div className="row">
//         {users.map((user) => (
//           <div key={user.id} className="col-md-6 mb-3">
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">{user.name}</h5>
//                 <p className="card-text">Role: {user.role}</p>
//                 <p className="card-text">Mobile: {user.mobile}</p>
//                 <p className="card-text">Email: {user.email}</p>
//                 <p className="card-text">Gender: {user.gender}</p>
//                 <p className="card-text">
//                   DOB: {new Date(user.dob).toLocaleDateString()}
//                 </p>
//                 {user.address && (
//                   <p className="card-text">Address: {user.address}</p>
//                 )}
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => deleteUser(user.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ADashboard;
