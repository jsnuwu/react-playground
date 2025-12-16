import "../styles/Navbar.css";
import React, { useState, useEffect } from "react";
import AiAvatar from "../assets/chatIcons/AiAvatar.png";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(
      "section, #bento, #stats, #AI, #team-planner, #lolMap, #add-player"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-links">
          <li>
            <a
              href="#bento"
              className={`nav-icon-link ${
                activeSection === "bento" ? "active" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1V9.5z" />
              </svg>
            </a>{" "}
          </li>
          <li>
            <a
              href="#stats"
              className={`nav-icon-link ${
                activeSection === "stats" ? "active" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h2v18H3V3zm18 0h2v18h-2V3zM9 14h2v7H9v-7zm4-9h2v16h-2V5zm4 4h2v12h-2V9z" />
              </svg>
            </a>{" "}
          </li>
          <li>
            <a
              href="#AI"
              className={`nav-icon-link ${
                activeSection === "AI" ? "active" : ""
              }`}
            >
              <img src={AiAvatar} alt="AI Avatar" className="nav-avatar" />
            </a>
          </li>
          <li>
            <a
              href="#team-planner"
              className={`nav-icon-link ${
                activeSection === "team-planner" ? "active" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h12v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </a>{" "}
          </li>
          <li>
            <a
              href="#lolMap"
              className={`nav-icon-link ${
                activeSection === "lolMap" ? "active" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6"></polygon>
                <line x1="8" y1="3" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="21"></line>
              </svg>
            </a>{" "}
          </li>
          <li>
            <a
              href="#add-player"
              className={`nav-icon-link ${
                activeSection === "add-player" ? "active" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </a>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
