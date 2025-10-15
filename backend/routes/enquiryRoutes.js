import express from "express";
import { addEnquiry, getAllEnquiries } from "../controllers/enquiryController.js";

const router = express.Router();

// Route to add a new enquiry (public)
router.post("/", addEnquiry);

// Route to get all enquiries (admin)
router.get("/", getAllEnquiries);

export default router;
