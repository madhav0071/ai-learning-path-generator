import { useState } from "react";
import api from "./api/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080c14;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
  }

  .app-root {
    min-height: 100vh;
    background: #080c14;
    background-image:
      radial-gradient(ellipse 80% 50% at 50% -20%, rgba(56, 120, 255, 0.12) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 80% 80%, rgba(100, 60, 255, 0.07) 0%, transparent 60%);
    padding: 60px 24px 80px;
  }

  .container {
    max-width: 780px;
    margin: 0 auto;
    display: flex;
   flex-direction: column;
   align-items: center;
  }

  /* ── HEADER ── */
  .header {
    text-align: center;
    margin-bottom: 56px;
    animation: fadeUp 0.7s ease both;
    width: 100%;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(56,120,255,0.12);
    border: 1px solid rgba(56,120,255,0.3);
    color: #6ea3ff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 20px;
  }
  .badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #6ea3ff;
    box-shadow: 0 0 8px #6ea3ff;
    animation: blink 2s ease infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
  }
  .title {
    font-family: 'Syne', sans-serif;
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #ffffff 30%, #6ea3ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 14px;
  }
  .subtitle {
    font-size: 15px;
    font-weight: 300;
    color: #8891a8;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ── INPUT AREA ── */
  .input-card {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 28px;
    margin-bottom: 40px;
    backdrop-filter: blur(10px);
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .input-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #556080;
    margin-bottom: 10px;
  }
  .input-row {
    display: flex;
    gap: 10px;
  }
  .text-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 18px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #e8eaf0;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .text-input::placeholder { color: #3d4a60; }
  .text-input:focus {
    border-color: rgba(110,163,255,0.5);
    box-shadow: 0 0 0 3px rgba(56,120,255,0.1);
  }
  .btn-generate {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 26px;
    background: linear-gradient(135deg, #2a6cff, #5b3fff);
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 24px rgba(42,108,255,0.35);
  }
  .btn-generate:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 32px rgba(42,108,255,0.5);
  }
  .btn-generate:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── ERROR ── */
  .error-msg {
    margin-top: 12px;
    padding: 10px 16px;
    background: rgba(255,80,80,0.08);
    border: 1px solid rgba(255,80,80,0.2);
    border-radius: 8px;
    color: #ff7070;
    font-size: 13px;
  }

  /* ── SKELETON ── */
  @keyframes shimmer {
    0% { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  .skeleton {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 600px 100%;
    animation: shimmer 1.6s infinite;
    border-radius: 14px;
    margin-bottom: 14px;
  }

  /* ── ROADMAP HEADER ── */
  .roadmap-header {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 28px;
    animation: fadeUp 0.5s ease both;
  }
  .roadmap-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.02em;
    text-transform: capitalize;
    margin-bottom: 8px;
  }
  .duration-pill {
    background: rgba(110,163,255,0.12);
    border: 1px solid rgba(110,163,255,0.25);
    color: #6ea3ff;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 0.05em;
  }
  .btn-download {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 20px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #c5ccdb;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .btn-download:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
  }

  /* ── WEEK CARD ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .week-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 26px 28px;
    margin-bottom: 16px;
    transition: border-color 0.25s, transform 0.2s;
    animation: fadeUp 0.45s ease both;
  }
  .week-card:hover {
    border-color: rgba(110,163,255,0.2);
    transform: translateY(-2px);
  }
  .week-card-top {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }
  .week-number {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #2a6cff;
    background: rgba(42,108,255,0.12);
    border: 1px solid rgba(42,108,255,0.25);
    padding: 3px 12px;
    border-radius: 100px;
  }
  .week-topic {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #dde3f0;
    letter-spacing: -0.01em;
    text-transform: capitalize;
  }
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin-bottom: 18px;
  }
  .resource-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .resource-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .resource-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #2a6cff;
    flex-shrink: 0;
    box-shadow: 0 0 6px #2a6cff;
  }
  .resource-link {
    color: #8aabf0;
    text-decoration: none;
    font-size: 14px;
    font-weight: 400;
    transition: color 0.2s;
    line-height: 1.4;
  }
  .resource-link:hover { color: #c5d8ff; text-decoration: underline; }

  /* ── SPINNER ── */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }
`;

export default function App() {
  const [input, setInput] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRoadmap = async () => {
    if (!input.trim()) {
      setError("Please enter a learning goal.");
      return;
    }
    setLoading(true);
    setError(null);
    setRoadmap(null);
    try {
      const response = await api.post("/generate", { input });
      setRoadmap(response.data);
    } catch (err) {
      if (err.response) setError("Server error. Please try again.");
      else if (err.request) setError("Backend not responding.");
      else setError("Something went wrong.");
    }
    setLoading(false);
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 16;
    const usableWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPageBreak = (neededHeight) => {
      if (y + neededHeight > pageHeight - 20) {
        pdf.addPage();
        pdf.setFillColor(8, 12, 20);
        pdf.rect(0, 0, pageWidth, pageHeight, "F");
        y = 20;
      }
    };

    pdf.setFillColor(8, 12, 20);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("AI Learning Path Generator", pageWidth / 2, y, {
      align: "center",
    });
    y += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(110, 163, 255);
    pdf.text(`Goal: ${roadmap.goal}`, pageWidth / 2, y, { align: "center" });
    y += 7;
    pdf.text(`Duration: ${roadmap.weeks} weeks`, pageWidth / 2, y, {
      align: "center",
    });
    y += 10;

    pdf.setDrawColor(42, 108, 255);
    pdf.setLineWidth(0.4);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;

    roadmap.roadmap.forEach((week) => {
      checkPageBreak(30);

      pdf.setFillColor(20, 28, 48);
      pdf.roundedRect(margin, y, usableWidth, 10, 3, 3, "F");
      pdf.setTextColor(110, 163, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(`WEEK ${week.week}`, margin + 4, y + 7);

      pdf.setTextColor(220, 230, 255);
      pdf.setFontSize(12);
      const topicX = margin + 28;
      pdf.text(
        week.topic.charAt(0).toUpperCase() + week.topic.slice(1),
        topicX,
        y + 7,
      );
      y += 14;

      week.resources.forEach((res) => {
        checkPageBreak(10);
        pdf.setFillColor(42, 108, 255);
        pdf.circle(margin + 3, y + 2, 1.2, "F");
        pdf.setTextColor(138, 171, 240);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        const lines = pdf.splitTextToSize(res.title, usableWidth - 12);
        pdf.text(lines, margin + 8, y + 3);
        y += lines.length * 6 + 2;
      });

      y += 6;

      if (y < pageHeight - 20) {
        pdf.setDrawColor(255, 255, 255, 0.1);
        pdf.setLineWidth(0.2);
        pdf.line(margin, y, pageWidth - margin, y);
        y += 6;
      }
    });

    pdf.save("learning-roadmap.pdf");
  };

  return (
    <div className="app-root">
      <style>{styles}</style>
      <div className="container">
        {/* HEADER */}
        <div className="header">
          <div className="badge">AI-Powered</div>
          <h1 className="title">
            Your Personalized
            <br />
            Learning Roadmap
          </h1>
          <p className="subtitle">
            Describe your goal and get a structured week-by-week plan with
            curated resources.
          </p>
        </div>

        {/* INPUT */}
        <div className="input-card">
          <div className="input-label">What do you want to learn?</div>
          <div className="input-row">
            <input
              className="text-input"
              type="text"
              placeholder='e.g. "Teach me Python in 2 months"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateRoadmap()}
            />
            <button
              className="btn-generate"
              onClick={generateRoadmap}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
              {loading ? "Generating…" : "Generate"}
            </button>
          </div>
          {error && <div className="error-msg">{error}</div>}
        </div>

        {/* SKELETON */}
        {loading && (
          <div>
            {[100, 85, 90, 75].map((w, i) => (
              <div
                key={i}
                className="skeleton"
                style={{
                  height: "88px",
                  width: `${w}%`,
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* ROADMAP */}
        {roadmap && (
          <div id="roadmap" style={{ width: "100%" }}>  
            <div className="roadmap-header">
              <div>
                <h2 className="roadmap-title">{roadmap.goal}</h2>
                <span className="duration-pill">{roadmap.weeks} Weeks</span>
              </div>
              <button className="btn-download" onClick={downloadPDF}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </button>
            </div>

            {roadmap.roadmap.map((week, idx) => (
              <div
                className="week-card"
                key={week.week}
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="week-card-top">
                  <span className="week-number">Week {week.week}</span>
                  <h3 className="week-topic">{week.topic}</h3>
                </div>
                <div className="divider" />
                <ul className="resource-list">
                  {week.resources.map((res, i) => (
                    <li className="resource-item" key={i}>
                      <span className="resource-dot" />
                      <a
                        className="resource-link"
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {res.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
