// src/pages/AskDoubt.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./AskDoubt.css";

const API = process.env.REACT_APP_API_BASE || "https://studyhub-21ux.onrender.com/api";

export default function AskDoubt() {
  const [doubts, setDoubts] = useState([]);
  const [question, setQuestion] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`${API}/doubts`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setDoubts(data.data || data || []);
      })
      .catch((err) => {
        console.error("Fetch doubts error:", err);
        setDoubts([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const postDoubt = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    try {
      const res = await fetch(`${API}/doubts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Guest", question, description: desc }),
      });
      const data = await res.json();
      if (data.success || res.status === 201) {
        setDoubts((prev) => [data.data || data.question || data, ...prev]);
        setQuestion("");
        setDesc("");
      } else {
        // fallback local push
        setDoubts((prev) => [{ _id: `local-${Date.now()}`, question, description: desc, answers: [] }, ...prev]);
        setQuestion(""); setDesc("");
      }
    } catch (err) {
      console.error("Post doubt error:", err);
      setDoubts((prev) => [{ _id: `local-${Date.now()}`, question, description: desc, answers: [] }, ...prev]);
      setQuestion(""); setDesc("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="ask-doubt-container">
        <h2 className="ask-doubt-title">Ask a Question</h2>

        <form onSubmit={postDoubt} className="doubt-form">
          <input
            placeholder="Short question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="doubt-input"
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="doubt-textarea"
          />
          <div className="doubt-form-actions">
            <button className="btn btn-primary" type="submit">Post Question</button>
          </div>
        </form>

        <h3 className="community-title">Community Questions</h3>
        {loading ? <p className="loading-text">Loading...</p> : doubts.length === 0 ? <p className="empty-state">No questions yet.</p> : (
          <div className="doubts-grid">
            {doubts.map((d) => (
              <div key={d._id || d.id} className="doubt-card">
                <h4 className="doubt-question">{d.question}</h4>
                {d.description && <p className="doubt-description">{d.description}</p>}
                {(d.answers || []).length > 0 ? (
                  <div className="answers-section">
                    <strong className="answers-label">Answers</strong>
                    {(d.answers || []).map((a, i) => <div key={i} className="answer-text">{a.text}</div>)}
                  </div>
                ) : <p className="no-answers">No answers yet</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
