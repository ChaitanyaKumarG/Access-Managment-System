import React, { useState, useEffect } from "react";
import axios from "axios";

const UDashboard = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    gender: "",
    dob: "",
  });

 const showAlert = () => {
   alert("Ticket Raised and the SuperAdmin will resolve this issue soon");
 };

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("currentUserId");

  // Check userId and handle missing session storage
  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in sessionStorage");
      setError("You are not logged in. Redirecting...");
      setTimeout(() => (window.location.href = "/log"), 2000);
      return;
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    console.log("Fetching user profile for ID:", userId);

    if (!userId) {
      console.error("No user ID found. Skipping fetch.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:2323/users/${userId}`);
      console.log("User profile fetched successfully:", response.data);

      setUser(response.data);
      setFormData({
        name: response.data.name,
        mobile: response.data.mobile,
        email: response.data.email,
        address: response.data.address || "",
        gender: response.data.gender,
        dob: response.data.dob.split("T")[0],
      });
      setError(null);
    } catch (err) {
      console.error("Error fetching user profile:", err.message);
      setError("Failed to fetch user profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h1>User Dashboard</h1>
      {isEditing ? (
        <form>{/* Form for editing */}</form>
      ) : (
        <div className="">
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Mobile:</strong> {user?.mobile || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
          <p>
            <strong>Address:</strong> {user?.address || "N/A"}
          </p>
          <p>
            <strong>Gender:</strong> {user?.gender || "N/A"}
          </p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
          </p>
          <button
            onClick={showAlert}
            // onClick={() => setIsEditing(true)}
            className="btn btn-primary"
          >
            Raise Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default UDashboard;
