import "./Contact.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png"; // ✅ add this

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      {/* Header with Logo */}
      <div className="contact-header">
        <div className="contact-header-top">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Musify Logo" className="logo-img" />
          </div>

          <div className="contact-header-text">
            <h1>Contact Us</h1>
            <p>
              We'd love to hear from you. Reach out for queries, feedback, or
              collaboration.
            </p>
          </div>
        </div>
      </div>

      <div className="contact-card">
        {/* Left Section */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Have questions about Musify or our music recommendation system?
            Drop us a message and we’ll get back to you soon.
          </p>

          <div className="info-block">
            <span>Email</span>
            <p>anushkaguptaweb@gmail.com</p>
          </div>

          <div className="info-block">
            <span>Designed for</span>
            <p>Hackathon Project</p>
          </div>
        </div>

        {/* Right Section */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
