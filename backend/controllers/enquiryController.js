import Enquiry from "../models/Enquiry.js";
import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail
    pass: process.env.GMAIL_PASS, // App Password (not your regular password)
  },
});

// ➕ Add a new enquiry
export const addEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save enquiry to DB
    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      message,
    });
    await newEnquiry.save();

    // Send email notification to admin
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // your Gmail (admin)
      subject: `New Enquiry from ${name}`,
      text: `You have received a new enquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

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

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await Enquiry.findByIdAndDelete(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry", error });
  }
};
