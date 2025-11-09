import express from "express";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { addEnquiry, getAllEnquiries ,deleteEnquiry} from "../controllers/enquiryController.js";


const router = express.Router();

// Route to add a new enquiry (public)
router.post("/", addEnquiry);

// Route to get all enquiries (admin)
router.get("/", protectAdmin, getAllEnquiries);
router.delete("/:id", protectAdmin, deleteEnquiry);

export default router;
