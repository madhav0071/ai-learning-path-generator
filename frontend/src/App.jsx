import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/generate", {
        input,
      });

      setRoadmap(response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Learning Path Generator</h1>

      <input
        type="text"
        placeholder="Teach me Python in 2 months"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "400px", padding: "10px" }}
      />

      <button
        onClick={generateRoadmap}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Generate
      </button>

      {loading && <p>Generating roadmap...</p>}

      {roadmap && (
        <div style={{ marginTop: "30px" }}>
          <h2>Goal: {roadmap.goal}</h2>
          <h3>Duration: {roadmap.weeks} weeks</h3>

          {roadmap.roadmap.map((week) => (
            <div key={week.week} style={{ marginTop: "20px" }}>
              <h4>
                Week {week.week}: {week.topic}
              </h4>

              <ul>
                {week.resources.map((res, index) => (
                  <li key={index}>
                    <a href={res.url} target="_blank">
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
  );
}

export default App;
