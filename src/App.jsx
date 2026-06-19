import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.name.trim().length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Form Submitted Successfully!");

        setFormData({
          name: "",
          email: "",
          phone: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <>
      <nav className="navbar">
        <h2>🤖 AI & Robotics Summer Workshop</h2>
      </nav>

      <section className="hero">
        <h1>AI & Robotics Summer Workshop</h1>

        <p className="tagline">
          Build AI Projects • Learn Robotics • Earn Certificate
        </p>

        <p>
          Learn Artificial Intelligence and Robotics through fun projects,
          coding activities, and interactive online sessions.
        </p>

        <a href="#register">
          <button>Enroll Now 🚀</button>
        </a>
      </section>

      <section className="details">
        <h2>Workshop Details</h2>

        <div className="cards">
          <div className="card">
            <h3>Age Group</h3>
            <p>8–14 Years</p>
          </div>

          <div className="card">
            <h3>Duration</h3>
            <p>4 Weeks</p>
          </div>

          <div className="card">
            <h3>Mode</h3>
            <p>Online</p>
          </div>

          <div className="card">
            <h3>Fee</h3>
            <p>₹2,999</p>
          </div>

          <div className="card">
            <h3>Start Date</h3>
            <p>15 July 2026</p>
          </div>
        </div>
      </section>

      <section className="outcomes">
        <h2>Learning Outcomes</h2>

        <ul>
          <li>Introduction to Artificial Intelligence</li>
          <li>Basics of Robotics</li>
          <li>Programming Fundamentals</li>
          <li>Robot Building Concepts</li>
          <li>Hands-on Mini Projects</li>
        </ul>
      </section>

      <section className="faq">
        <h2>FAQs</h2>

        <div className="faq-item">
          <h4>Do I need prior coding experience?</h4>
          <p>No, the workshop is beginner friendly.</p>
        </div>

        <div className="faq-item">
          <h4>Will sessions be recorded?</h4>
          <p>Yes, recordings will be available.</p>
        </div>

        <div className="faq-item">
          <h4>Is a certificate provided?</h4>
          <p>Yes, every participant receives a certificate.</p>
        </div>
      </section>

      <section className="form-section" id="register">
        <h2>Register Now</h2>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 Digit Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">Register Now 🚀</button>
        </form>
      </section>
    </>
  );
}

export default App;