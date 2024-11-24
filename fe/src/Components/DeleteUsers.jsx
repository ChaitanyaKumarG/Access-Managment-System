import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2323/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:2323/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>User List---</h1>
      {users ? (
        <>
          <div>
            {users.map((i) => (
              <div className="border-dark border m-1 container">
                <p>
                  {i.name} - {i.role}
                </p>
                <button onClick={() => deleteUser(i.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DeleteUsers;
