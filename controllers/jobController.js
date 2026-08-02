const Job = require("../models/Job");

// Create Job
const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            data: job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get All Jobs

const getAllJobs = async (req, res) => {
  try {
    const search = req.query.search || "";
    const status = req.query.status || "";
    const sort = req.query.sort || "latest";

    const query = {};

    // Search by company name
    if (search) {
      query.company = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Sorting
    const sortOption =
      sort === "latest" ? { createdAt: -1 } : { createdAt: 1 };

    const jobs = await Job.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            data: job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Dashboard Statistics

const getDashboardStats = async (req, res) => {
    try {

        const total = await Job.countDocuments();

        const applied = await Job.countDocuments({ status: "Applied" });

        const interview = await Job.countDocuments({
            status: "Interview Scheduled"
        });

        const selected = await Job.countDocuments({
            status: "Selected"
        });

        const rejected = await Job.countDocuments({
            status: "Rejected"
        });

        const offer = await Job.countDocuments({
            status: "Offer Received"
        });

        res.status(200).json({
            success: true,
            data: {
                total,
                applied,
                interview,
                selected,
                rejected,
                offer
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Update Job

const updateJob = async (req, res) => {
    try {

        const job = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job Updated Successfully",
            data: job
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Job

const deleteJob = async (req, res) => {

    try {

        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {

            return res.status(404).json({
                success:false,
                message:"Job not found"
            });

        }

        res.status(200).json({
            success:true,
            message:"Job Deleted Successfully"
        });

    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};



module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getDashboardStats
};