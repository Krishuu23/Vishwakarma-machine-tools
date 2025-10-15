import Enquiry from "../models/Enquiry.js";

// ➕ Add a new enquiry
export const addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });

    await newEnquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully", enquiry: newEnquiry });
  } catch (error) {
    console.error("Error adding enquiry:", error);
    res.status(500).json({ error: "Failed to submit enquiry" });
  }
};

// 📥 Get all enquiries (for admin)
export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
};
