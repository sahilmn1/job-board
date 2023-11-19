import React, { useState } from "react";
import "../assets/css/styles.css";
import { useNavigate } from "react-router-dom";
const JobForm = ({ employerId }) => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salery: "",
    jobType: "",
    employerId: employerId,
    // Add more fields as needed
  });
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in jobData) {
      if (!jobData[key]) {
        setFormError(`Please fill in all fields.`);
        return;
      }
    }

    try {
      // Send a POST request to your backend to create a new job
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const data = await response.json();
      alert("Job created successfully:", data);
      // Reset form data and error after successful submission
      setJobData({
        title: "",
        description: "",
        company: "",
        location: "",
        salery: "",
        jobType: "",
        employerId: employerId,
      });
      setFormError("");
      // You may want to add a success message or redirect to job listings page
    } catch (error) {
      console.error("Error creating job:", error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Replace history.goBack() with navigate(-1)
  };
  return (
    <div className="container margin-top">
      <button className="btn btn-primary" onClick={handleGoBack}>
        Back
      </button>
      <h3>Create a New Job</h3>
      <p>Your employerId during the Submission of Job is : {employerId}</p>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleJobSubmit}>
        {/* ... (rest of the form) */}
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={jobData.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={jobData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company:</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={jobData.company}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="text"
            className="form-control"
            name="salery"
            value={jobData.salery}
            onChange={handleInputChange}
          />
        </div>

        {/* Add select element for job type */}
        <div className="mb-3">
          <label className="form-label">Job Type:</label>
          <select
            className="form-control"
            name="jobType"
            value={jobData.jobType}
            onChange={handleInputChange}
          >
            <option disabled value="">
              -Select-
            </option>
            <option value="part-time">Part Time</option>
            <option value="full-time">Full Time</option>
            <option value="work-from-home">Work from Home</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
