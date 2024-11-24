import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [users, setUsers] = useState([]); // Original list of users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered list for display
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
    profilePicture: "",
  });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:2323/users")
      .then((res) => {
        const userData = Array.isArray(res.data) ? res.data : [];
        setUsers(userData);
        setFilteredUsers(userData);
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

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the search query
    if (query.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Search Functionality</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* User List */}
      <h2 className="text-center mb-4">Users</h2>
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
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
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditing(user.id);
                      setFormData({
                        name: user.name,
                        role: user.role,
                        mobile: user.mobile,
                        email: user.email,
                        address: user.address || "",
                        gender: user.gender,
                        dob: user.dob.split("T")[0],
                        profilePicture: user.profilePicture || "",
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    // onClick={() => deleteUser(user.id)}
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

export default Search;