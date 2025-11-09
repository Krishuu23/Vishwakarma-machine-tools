import Enquiry from "../models/Enquiry.js";
import {Resend} from "resend"

// Create reusable transporter
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const fromAddress = process.env.INQUIRY_EMAIL || "Your Site <noreply@yoursite.com>";
    const adminAddress = process.env.INQUIRY_EMAIL ;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [adminAddress],
      subject: `New Enquiry from ${name}`,
      text: `You have received a new enquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      // If you have HTML version, you could use the html property:
      html: `<p>You have received a new enquiry:</p>
             <ul>
               <li><strong>Name:</strong> ${name}</li>
               <li><strong>Email:</strong> ${email}</li>
               <li><strong>Phone:</strong> ${phone}</li>
               <li><strong>Message:</strong> ${message}</li>
             </ul>`
    });

    if (error) {
      console.error("Error sending email via Resend:", error);
      // optionally: decide whether to proceed or treat as failure
    } else {
      console.log("Resend email data:", data);
    }

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
