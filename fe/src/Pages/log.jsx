import { useState } from "react";

const LogPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:2323/users");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const users = await response.json();

      const user = users.find(
        (u) =>
          u.name.toLowerCase() === formData.username.toLowerCase() &&
          u.role === formData.role
      );

      if (user) {
        sessionStorage.setItem("currentUserId", user.id);
        switch (user.role) {
          case "Super Admin":
            window.location.href = "/sadashboard";
            break;
          case "Admin":
            window.location.href = "/adashboard";
            break;
          case "User":
            window.location.href = "/udashboard";
            break;
          default:
            window.location.href = "/dashboard";
        }
      } else {
        setError("Invalid username or role combination");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className=""
      style={{
        background:
          "https://static.vecteezy.com/system/resources/previews/010/847/581/non_2x/gradient-background-for-covers-wallpaper-social-media-web-design-and-many-other-vector.jpg",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-lg-4">
          <div className="card border-dark border">
            <div className="card-body p-4">
              <h3>ACCESS MANAGEMENT SYSTEM</h3>
              <form onSubmit={handleLogin}>
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}

                <div className="mb-4 mt-4">
                  <label htmlFor="username" className="form-label fw-bold">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="form-label fw-bold">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="form-control form-control-lg"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg mb-3"
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
                      Logging in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
              <p>Don't have an account?</p>
              <button
                className="btn btn-success bg-opacity-25 form-control btn-lg"
                onClick={() => (window.location.href = "/register")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogPage;

// import { useState } from "react";

// const LogPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     role: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:2323/users");
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
//       const users = await response.json();

//       const user = users.find(
//         (u) =>
//           u.name.toLowerCase() === formData.username.toLowerCase() &&
//           u.role === formData.role
//       );

//       if (user) {
//         sessionStorage.setItem("currentUserId", user.id);
//         switch (user.role) {
//           case "Super Admin":
//             window.location.href = "/sadashboard";
//             break;
//           case "Admin":
//             window.location.href = "/adashboard";
//             break;
//           case "User":
//             window.location.href = "/udashboard";
//             break;
//           default:
//             window.location.href = "/dashboard";
//         }
//       } else {
//         setError("Invalid username or role combination");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "An error occurred during login");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className=""
//       style={{
//         background:
//           "https://static.vecteezy.com/system/resources/previews/010/847/581/non_2x/gradient-background-for-covers-wallpaper-social-media-web-design-and-many-other-vector.jpg",
//         minHeight: "100vh",
//       }}
//     >
//       <div className="row justify-content-center align-items-center min-vh-100">
//         <div className="col-lg-4">
//           <div className="card border-dark border">
//             <div className=" card-body p-4">
//               <h3>ACCESS MANAGEMENT SYSTEM</h3>
//               <form onSubmit={handleLogin}>
//                 {error && (
//                   <div className="alert alert-danger text-center" role="alert">
//                     {error}
//                   </div>
//                 )}

//                 <div className="mb-4 mt-4">
//                   <label htmlFor="username" className="form-label fw-bold">
//                     Username
//                   </label>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     className="form-control form-control-lg"
//                     placeholder="Enter your username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="role" className="form-label fw-bold">
//                     Role
//                   </label>
//                   <select
//                     id="role"
//                     name="role"
//                     className="form-control form-control-lg"
//                     value={formData.role}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Role</option>
//                     <option value="Super Admin">Super Admin</option>
//                     <option value="Admin">Admin</option>
//                     <option value="User">User</option>
//                   </select>
//                 </div>

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100 btn-lg mb-3"
//                   disabled={isLoading}
//                   style={{
//                     borderRadius: "10px",
//                     background: "#007bff",
//                     borderColor: "#007bff",
//                   }}
//                 >
//                   {isLoading ? (
//                     <>
//                       <span
//                         className="spinner-border spinner-border-sm me-2"
//                         role="status"
//                         aria-hidden="true"
//                       ></span>
//                       Logging in...
//                     </>
//                   ) : (
//                     "Sign in"
//                   )}
//                 </button>
//               </form>
//               <p>Don't have an account?</p>
//               <button className="btn btn-success bg-opacity-25 form-control btn-lg" onSubmit={(window.location.href ="/register")}>
//                 register
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogPage;
