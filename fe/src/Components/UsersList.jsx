import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:2323/users")
      .then((res) => {
        console.log("API Response:", res.data); // Debug log
        // Check if res.data is an array, if not, check if it has a nested data property
        const userData = Array.isArray(res.data) ? res.data : res.data.data;
        setUsers(userData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found</div>;

  return (
    <div>
      <h1>User List---</h1>
      <div>
        {users.map((user) => (
          <div key={user.id} className="border-dark border m-1 container">
            <p className="m-0 p-0">ID: {user.id}</p>
            <p className="m-0 p-0">Name: {user.name}</p>
            <p className="m-0 p-0">Role: {user.role}</p>
            <p className="m-0 p-0">DOB: {user.dob}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UsersList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:2323/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1>User List---</h1>
//       {users ? (
//         <>
//           <p>data recived</p>
//           <div>
//             {users.map((i) => (
//               <div className="border-dark border m-1 container">
//                 <p className="m-0 p-0">ID: {i.id}</p>
//                 <p className="m-0 p-0">Name: {i.name}</p>
//                 <p className="m-0 p-0">Role: {i.role}</p>
//                 <p className="m-0 p-0">DOB: {i.dob}</p>
//               </div>
//             ))};
//           </div>
//         </>
//       ) : (
//         <></>
//       )}
//     </div>
//   );
// };

// export default UsersList;
