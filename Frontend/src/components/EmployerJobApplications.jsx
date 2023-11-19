import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EmployerJobApplications = () => {
  const { employerId, jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch applications for the specific job
    fetch(
      `http://localhost:5000/api/employer/jobs/${employerId}/applications/${jobId}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Error fetching applications");
        setLoading(false);
      });
  }, [employerId, jobId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Applications for this Job</h2>
      {loading ? (
        <>
          <div className="alert alert-info">Loading Job Applications</div>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : (
        <ul className="list-group mb-4">
          {applications.map((application) => (
            <React.Fragment key={application._id}>
              <li className="list-group-item">
                <strong>Candidate:</strong> User Name: {application.name},
                Email: {application.email}, Mobile: {application.mobile}
                <br />
                <strong>Resume Link:</strong>{" "}
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Get Resume
                </a>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
      <Link to={`/dashboard`} className="btn btn-secondary">
        Back to Your Posted Jobs
      </Link>
    </div>
  );
};

export default EmployerJobApplications;
