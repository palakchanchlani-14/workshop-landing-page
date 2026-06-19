import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Temporary storage
let enquiries = [];

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Submit Form
app.post("/api/enquiry", (req, res) => {
  const { name, email, phone } = req.body;

  // Validation
  if (!name?.trim()) {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email",
    });
  }

  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits",
    });
  }

  const newEnquiry = {
    id: Date.now(),
    name,
    email,
    phone,
    createdAt: new Date(),
  };

  enquiries.push(newEnquiry);

  console.log("New Enquiry:", newEnquiry);

  res.status(201).json({
    success: true,
    message: "Form submitted successfully",
    data: newEnquiry,
  });
});

// Get All Enquiries
app.get("/api/enquiries", (req, res) => {
  res.json({
    success: true,
    total: enquiries.length,
    data: enquiries,
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});