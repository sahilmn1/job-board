const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salery: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  employerId: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  applications: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: String,
      email: String,
      mobile: String,
      resume: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

jobSchema.methods.getApplications = async function () {
  const populatedApplications = await this.model("Job")
    .findById(this._id)
    .populate("applications.user");
  return populatedApplications.applications;
};

const collectionName = "jobs";
const Job = mongoose.model("Job", jobSchema, collectionName);

module.exports = Job;
