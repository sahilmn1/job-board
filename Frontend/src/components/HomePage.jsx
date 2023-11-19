import React, { useState, useEffect } from "react";
import "../assets/css/styles.css";
import FeaturedJobListings from "./FeaturedJobListings";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an API call or any asynchronous operation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const featuredJobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCo",
      description: "Exciting software engineering position.",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Web Development",
      company: "Google Inc.",
      description: "Your welcome in the position of web development.",
      location: "Gwalior, MP",
    },
  ];

  return (
    <div className="container mt-5">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="jumbotron margin-top">
          <h1 className="display-4">Welcome to the Job Board!</h1>
          <p className="lead">
            Find your dream job or attract the right talent.
          </p>
          <FeaturedJobListings featuredJobs={featuredJobs} />
          {/* Add featured job listings or any other content you want on the home page */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
