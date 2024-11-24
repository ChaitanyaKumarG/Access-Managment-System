import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUsers = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
  });

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:2323/users")
      .then((res) => {
        console.log("Fetched Data:", res.data);
        setUsers(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditing(user.id);
    setFormData({
      name: user.name,
      role: user.role,
      mobile: user.mobile,
      email: user.email,
      address: user.address || "",
      gender: user.gender,
      dob: user.dob.split("T")[0],
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = (id) => {
    // Add validation
    if (
      !formData.name ||
      !formData.role ||
      !formData.mobile ||
      !formData.email ||
      !formData.gender ||
      !formData.dob
    ) {
      setError("Please fill all required fields");
      return;
    }

    console.log("Sending Update Data:", formData); // Debug log

    axios
      .put(`http://localhost:2323/users/${id}`, formData)
      .then((res) => {
        console.log("Update Response:", res.data); // Debug log
        fetchUsers(); // Fetch fresh data after update
        setEditing(null);
        setFormData({
          name: "",
          role: "",
          mobile: "",
          email: "",
          address: "",
          gender: "",
          dob: "",
        });
        setError(null);
      })
      .catch((err) => {
        console.error("Update Error:", err);
        setError(err.response?.data?.error || err.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!users || users.length === 0) return <div>No users found</div>;

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                {editing === user.id ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Name"
                      required
                    />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-control mb-2"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Mobile"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Email"
                      required
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control mb-2"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="form-control mb-2"
                      required
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control mb-2"
                      placeholder="Address"
                    />
                    <div>
                      <button
                        onClick={() => updateUser(user.id)}
                        className="btn btn-primary me-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditing(null);
                          setError(null);
                        }}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">Role: {user.role}</p>
                    <p className="card-text">Mobile: {user.mobile}</p>
                    <p className="card-text">Email: {user.email}</p>
                    <p className="card-text">Gender: {user.gender}</p>
                    <p className="card-text">
                      DOB: {new Date(user.dob).toLocaleDateString()}
                    </p>
                    {user.address && (
                      <p className="card-text">Address: {user.address}</p>
                    )}
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateUsers;
