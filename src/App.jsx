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
        alert("Registration Successful!");

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
        <h2>🚀 AI & Robotics Summer Workshop 2026</h2>
      </nav>

      <section className="hero">
        <h1>Learn AI & Robotics Through Fun Projects</h1>
        <p className="tagline">
          Build AI Projects • Learn Robotics • Earn Certificate
        </p>

        <p>
          Explore Artificial Intelligence and Robotics through hands-on
          projects, interactive coding activities, and guided learning sessions
          designed for young innovators and future tech creators.
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
            <p>₹2,499 Early Bird</p>
          </div>

          <div className="card">
            <h3>Start Date</h3>
            <p>15 July 2026</p>
          </div>

          <div className="card">
            <h3>Projects</h3>
            <p>AI Chatbot & Smart Robot Simulation</p>
          </div>
        </div>
      </section>

      <section className="outcomes">
        <h2>What Students Will Learn</h2>

        <ul>
          <li>Build a Beginner-Friendly AI Chatbot</li>
          <li>Understand Machine Learning Concepts</li>
          <li>Create Robot Logic Simulations</li>
          <li>Learn Problem Solving Through Coding</li>
          <li>Work on Real-World Mini Projects</li>
          <li>Present a Final Project with Confidence</li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Do I need prior coding experience?</h4>
          <p>
            No. The workshop is designed for complete beginners and students
            who are curious about technology.
          </p>
        </div>

        <div className="faq-item">
          <h4>Will sessions be recorded?</h4>
          <p>
            Yes. Session recordings will be shared with registered students for
            revision and practice.
          </p>
        </div>

        <div className="faq-item">
          <h4>Is a certificate provided?</h4>
          <p>
            Yes. Every participant who completes the workshop will receive a
            certificate of participation.
          </p>
        </div>

        <div className="faq-item">
          <h4>What software is required?</h4>
          <p>
            A laptop with internet access and Google Chrome is enough to join
            the workshop.
          </p>
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

          <button type="submit">Register Now </button>
        </form>
      </section>

      <footer className="footer">
        <p>
          © 2026 AI & Robotics Summer Workshop | Inspiring Future Innovators
        </p>
      </footer>
    </>
  );
}

export default App;