const express = require("express");

const router = express.Router();

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    getDashboardStats
} = require("../controllers/jobController");

router.post("/", createJob);

router.get("/", getAllJobs);

router.get("/dashboard", getDashboardStats);

router.get("/:id", getJobById);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

module.exports = router;