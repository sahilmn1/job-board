// JobApplicationsList.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const JobApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  // useEffect(() => {
  //   // Fetch job applications associated with the logged-in candidate
  //   // You would typically do this using your backend API
  //   // Here, we assume you have a function like AuthService.getUserId() to get the logged-in user's ID
  //   const userId = AuthService.getUserId();

  //   axios
  //     .get(`http://localhost:5000/api/candidates/${userId}/applications`)
  //     .then((response) => setApplications(response.data))
  //     .catch((error) =>
  //       console.error("Error fetching job applications:", error)
  //     );
  // }, []);

  return (
    <div>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <h4>{application.job.title}</h4>
            <p>Status: {application.status}</p>
            {/* Display other details about the application */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplicationsList;
