const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/model");
const db = require("./config/database");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Job = require("./models/jobModel");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// connect to the database
db();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log("Received registration request:", { username, role });

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    console.log("Registration successful");
    res.status(200).json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Authentication endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If authentication is successful, include the user's role in the response
    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      Name: user.username,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salery,
      jobType,
      employerId,
    } = req.body;
    const newJob = new Job({
      title,
      description,
      company,
      location,
      salery,
      jobType,
      employerId,
      createdAt: new Date(), // Use the current date and time for unique timestamp
    });

    // Check if the job with the same title already exists
    const existingJob = await Job.findOne({ title });

    if (existingJob) {
      return res
        .status(400)
        .json({ message: "Job with the same title already exists" });
    }

    await newJob.save();
    res.status(201).json({ message: "Job post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// finds the jobs
// Get all job posts
app.get("/api/jobs_finds", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a job post by ID
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Set a job as featured
app.put("/jobs/feature/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findByIdAndUpdate(
      jobId,
      { featured: true },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all featured jobs
app.get("/jobs/featured", async (req, res) => {
  try {
    const featuredJobs = await Job.find({ featured: true });

    res.status(200).json(featuredJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// apply for the application
app.post("/api/apply/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const { name, email, mobile, resume } = req.body;

    // Find the job by ID
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the email already exists in applications
    const isEmailExists = job.applications.some((app) => app.email === email);

    if (isEmailExists) {
      return res
        .status(400)
        .json({ message: "Application with this email already exists" });
    }

    // Add the application to the job's applications array
    job.applications.push({ name, email, mobile, resume });

    // Save the updated job document
    await job.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// EmployerDashboard - Get all jobs posted by the employer
// EmployerDashboard - Get all jobs posted by the employer
app.get("/api/employer/jobs/:employerId", async (req, res) => {
  try {
    const employerId = req.params.employerId;

    // Fetch jobs based on the employer ID
    const jobs = await Job.find({ employerId });

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// EmployerJobApplications - Get applications for a specific job
app.get(
  "/api/employer/jobs/:employerId/applications/:jobId",
  async (req, res) => {
    try {
      const { employerId, jobId } = req.params;

      // Find the job by ID
      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Use the getApplications method to fetch applications
      const applications = await job.getApplications();

      res.status(200).json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

app.delete("/api/job/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
