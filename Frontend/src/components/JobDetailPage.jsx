import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/styles.css";

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    mobile: "",
    resume: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/jobs/${id}`)
        .then((response) => response.json())
        .then((data) => setJob(data))
        .catch((error) => console.error("Error fetching job details:", error));
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value,
    });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setApplicationData({
  //     ...applicationData,
  //     resume: file,
  //   });
  // };

  const fetchJobDetails = () => {
    // Fetch the job details again to reflect the updated applications
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) =>
        console.error("Error fetching job details after application:", error)
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here

    setSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/apply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: applicationData.name,
          email: applicationData.email,
          mobile: applicationData.mobile,
          resume: applicationData.resume,
        }),
      });

      if (response.ok) {
        alert("Application submitted successfully");
        // Optionally, you can redirect the user or show a success message
        // Reload the job details to reflect the updated applications
        fetchJobDetails();
      } else {
        alert("Application already Submitted:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center mb-3">
        <button className="btn btn-primary" onClick={handleGoBack}>
          Back
        </button>
        <h2 className="mb-4 margin-top">Job Details</h2>
      </div>
      {job ? (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{job.title}</h3>
            <p className="card-subtitle mb-2 text-muted">{job.company}</p>
            <p className="card-text">{job.description}</p>

            <h4 className="mt-4">Apply for this Job</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={applicationData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={applicationData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Your Mobile Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={applicationData.mobile}
                  onChange={handleInputChange}
                  // Add any validation attributes as needed
                />
              </div>
              <div className="mb-3">
                <label htmlFor="resume" className="form-label">
                  Resume Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resume"
                  name="resume"
                  value={applicationData.resume}
                  onChange={handleInputChange}
                  // Add any validation attributes as needed
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
