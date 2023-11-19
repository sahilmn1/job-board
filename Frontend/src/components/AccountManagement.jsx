import React, { useState } from "react";

const AccountManagement = () => {
  const [username, setUsername] = useState("exampleUser");
  const [email, setEmail] = useState("example@example.com");

  const handleUpdateUsername = () => {
    // Add logic to update the username
    const newUsername = prompt("Enter new username:");
    if (newUsername) {
      setUsername(newUsername);
      alert("Username updated successfully!");
    }
  };

  const handleUpdateEmail = () => {
    // Add logic to update the email
    const newEmail = prompt("Enter new email:");
    if (newEmail) {
      setEmail(newEmail);
      alert("Email updated successfully!");
    }
  };

  return (
    <div>
      <h3>Account Management</h3>
      <div>
        <p>Username: {username}</p>
        <button onClick={handleUpdateUsername}>Update Username</button>
      </div>
      <div>
        <p>Email: {email}</p>
        <button onClick={handleUpdateEmail}>Update Email</button>
      </div>
      {/* Add more account management features as needed */}
    </div>
  );
};

export default AccountManagement;
