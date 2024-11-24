import React, { useState } from "react";
import axios from "axios";

const AddUsers = () => {
  const [user, setUser] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:2323/users", user);
      alert("User added successfully!");
      setUser({
        name: "",
        role: "",
        mobile: "",
        email: "",
        address: "",
        gender: "",
        dob: "",
        profilePicture: "",
      });
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Failed to add user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "https://static.vecteezy.com/system/resources/previews/010/847/581/non_2x/gradient-background-for-covers-wallpaper-social-media-web-design-and-many-other-vector.jpg",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-6">
          <div className="card border-dark border">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Add New User</h3>
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label fw-bold">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-control"
                    value={user.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label fw-bold">
                    Mobile
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={user.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-bold">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter address"
                    value={user.address}
                    onChange={handleChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label fw-bold">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-control"
                    value={user.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label fw-bold">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="form-control"
                    value={user.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="profilePicture"
                    className="form-label fw-bold"
                  >
                    Profile Picture URL
                  </label>
                  <input
                    id="profilePicture"
                    name="profilePicture"
                    type="text"
                    className="form-control"
                    placeholder="Enter profile picture URL"
                    value={user.profilePicture}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg"
                  disabled={isLoading}
                  style={{
                    borderRadius: "10px",
                    background: "#007bff",
                    borderColor: "#007bff",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Adding User...
                    </>
                  ) : (
                    "Add User"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;

// import React, { useState } from "react";
// import axios from "axios";

// const AddUsers = () => {
//   const [user, setUser] = useState({
//     name: "",
//     role: "",
//     mobile: "",
//     email: "",
//     address: "",
//     gender: "",
//     dob: "",
//     profilePicture: "",
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:2323/users", user)
//       .then((res) => alert("User added successfully!"))
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="container border border-dark col-lg-2">
//       <form onSubmit={handleSubmit}>
//         <input name="name" onChange={handleChange} placeholder="Name" />
//         <input name="role" onChange={handleChange} placeholder="Role" />
//         <input name="mobile" onChange={handleChange} placeholder="Mobile" />
//         <input name="email" onChange={handleChange} placeholder="Email" />
//         <textarea name="address" onChange={handleChange} placeholder="Address"></textarea>
//         <input name="gender" onChange={handleChange} placeholder="Gender" />
//         <input name="dob" onChange={handleChange} placeholder="Date of Birth" />
//         <input
//           name="profilePicture"
//           onChange={handleChange}
//           placeholder="Profile Picture URL"
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default AddUsers;
