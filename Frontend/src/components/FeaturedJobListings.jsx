import React from "react";
import { Link } from "react-router-dom";

const FeaturedJobListings = ({ featuredJobs }) => {
  return (
    <div className="container mt-5">
      <h2>Featured Job Listings</h2>
      <ul className="list-unstyled">
        {featuredJobs.map((job) => (
          <li key={job.id} className="mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{job.title}</h3>
                <p className="card-subtitle mb-2 text-muted">{job.company}</p>
                <p className="card-text">{job.description}</p>
                <p className="card-text">Location: {job.location}</p>
                <Link to={`/jobs/${job.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedJobListings;
