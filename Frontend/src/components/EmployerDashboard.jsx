import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

const EmployerDashboard = (props) => {
  const { employerId } = props;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(employerId);
    // Fetch jobs posted by the employer
    fetch(`http://localhost:5000/api/employer/jobs/${employerId}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [employerId]);

  const handleDeleteJob = async (jobId) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return; // Do nothing if the user cancels the deletion
    }

    try {
      const response = await fetch(`http://localhost:5000/api/job/${jobId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Remove the deleted job from the state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Posted Jobs</h2>
      {loading ? (
        <>
          <div className="alert alert-info">Loading Jobs... </div>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <ul className="list-group mb-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/employer-dashboard/${employerId}/${job._id}/applications`}
                className="text-decoration-none"
              >
                {job.title}
              </Link>
              <BsTrash
                style={{ cursor: "pointer" }}
                className="text-danger"
                onClick={() => handleDeleteJob(job._id)}
              />
            </li>
          ))}
        </ul>
      )}

      <h2 className="mb-4">Post Your Jobs</h2>
      {loading ? (
        <>
          <div className="alert alert-info">
            Loading Jobs Posting Features...
          </div>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <Link to="/job-posting" className="btn btn-primary">
          Click to Post Jobs
        </Link>
      )}
    </div>
  );
};

export default EmployerDashboard;
