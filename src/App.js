import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SkillPieChart from "./components/SkillPieChart";
import SkillProgress from "./components/SkillProgress";
import SkillRadarChart from "./components/SkillRadarChart";
import DownloadButton from "./components/DownloadButton";
import DownloadPDFButton from "./components/DownloadPDFButton";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [role, setRole] = useState("AI/ML");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [predictedDomain, setPredictedDomain] = useState("");

  // In your JSX return:

  const handlePredictDomain = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/predict`, {
        skills: skillInput,
      });
      setPredictedDomain(res.data.predicted_domain);
    } catch (err) {
      console.error(err);
      setPredictedDomain("❌ Error predicting domain");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      setError("Please select a PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("role", role.toLowerCase());

    try {
      const res = await axios.post(`${BASE_URL}/upload_resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("❌ Upload failed or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>🧠 Smart Career Advisor</h2>

      <input type="file" accept=".pdf" onChange={handleFileChange} />

      <label style={{ marginTop: "1rem" }}>Select Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="AI/ML">AI/ML</option>
        <option value="Web Development">Web Development</option>
        <option value="Data Analyst">Data Analyst</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>

      <button onClick={handleUpload}>Analyze Resume</button>
      {loading && <p>⏳ Please wait...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔮 Career Predictor */}
      <div style={{ marginTop: "40px" }}>
        <h3>🔮 AI-Based Career Predictor</h3>
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter skills (e.g. python, html, css)"
          style={{ width: "60%", padding: "10px" }}
        />
        <button onClick={handlePredictDomain}>Predict Career Domain</button>
        {loading && <p>⏳ Predicting...</p>}

        {predictedDomain && (
          <div style={{ marginTop: "10px", fontWeight: "bold" }}>
            🎯 Predicted Domain: {predictedDomain}
          </div>
        )}
      </div>

      {/* Resume Results */}
      {result && (
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          <h3>🎯 Role: {result.role}</h3>
          <p>✅ Matched: {result.skills_matched.join(", ")}</p>
          <p>❌ Missing: {result.skills_missing.join(", ")}</p>

          <SkillProgress
            matched={result.skills_matched.length}
            total={result.skills_matched.length + result.skills_missing.length}
          />
          <SkillPieChart
            matched={result.skills_matched}
            missing={result.skills_missing}
          />
          <SkillRadarChart
            matched={result.skills_matched}
            missing={result.skills_missing}
          />

          <h4>📚 Resources:</h4>
          <ul>
            {result.resources.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <DownloadButton data={result} />
          <DownloadPDFButton data={result} />
        </div>
      )}
    </div>
  );
}

export default App;
// Note: Make sure to set the REACT_APP_BACKEND_URL environment variable in your .env file
// to point to your backend server URL, e.g., http://localhost:5000 or
