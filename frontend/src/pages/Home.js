// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const features = [
    { emoji: "📝", title: "Notes", desc: "Create and organize study notes", link: "/notes" },
    { emoji: "🎓", title: "Courses", desc: "Learn from curated courses", link: "/courses" },
    { emoji: "🕒", title: "Timetable", desc: "Plan your study schedule", link: "/timetable" },
    { emoji: "📚", title: "PYQs", desc: "Previous year questions", link: "https://drive.google.com/drive/folders/1IWg3sxnK0abUSWn3UUJckaoSMRSS19UD" },
    { emoji: "❓", title: "Ask Doubt", desc: "Get help from community", link: "/ask-doubt" },
  ];

  return (
    <>
      <Navbar />
      <div className="home-page">
        <section className="hero">
          <h1 className="hero-title">An Investment In Knowledge Pays The Best Interest</h1>
          <p className="hero-subtitle">
            StudyHub — notes, timetable, courses and community help all in one place.
          </p>
          <Link to="/courses" className="btn btn-accent">Explore Courses</Link>
        </section>

        <section className="features-section">
          <h2 className="section-title">Explore</h2>
          <div className="features-grid">
            {features.map((f) => (
              f.link.startsWith("http") ? (
                <a key={f.title} href={f.link} target="_blank" rel="noopener noreferrer" className="feature-card">
                  <div className="feature-emoji">{f.emoji}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </a>
              ) : (
                <Link key={f.title} to={f.link} className="feature-card">
                  <div className="feature-emoji">{f.emoji}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </Link>
              )
            ))}
          </div>
        </section>

        <section className="courses-section">
          <h2 className="section-title">Popular Courses</h2>
          <div className="courses-grid">
            <div className="course-card">
              <h4 className="course-title">Intro to Python</h4>
              <p className="course-meta">Beginner · 8 weeks</p>
              <a href="https://www.youtube.com/watch?v=nLRL_NcnK-4" target="_blank" rel="noreferrer" className="course-link">Preview</a>
            </div>
            <div className="course-card">
              <h4 className="course-title">Web Development</h4>
              <p className="course-meta">Core CS · 12 weeks</p>
              <a href="https://www.youtube.com/watch?v=nu_pCVPKzTk" target="_blank" rel="noreferrer" className="course-link">Preview</a>
            </div>
            <div className="course-card">
              <h4 className="course-title">Power BI</h4>
              <p className="course-meta">Business · 6 weeks</p>
              <a href="https://www.youtube.com/watch?v=FwjaHCVNBWA" target="_blank" rel="noreferrer" className="course-link">Preview</a>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          © {new Date().getFullYear()} StudyHub
        </footer>
      </div>
    </>
  );
}
