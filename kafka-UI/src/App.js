import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Recorder from "./routes/Recorder";
import Doc from "./routes/Doc";
import "./App.css"; 

function App() {
  return (
    <div className="App">
    <header className="App-header">
        <Router>
            <div>
                <nav>
                    <Link to="/record">🎤 Record</Link> | 
                  <Link to="/Doc">📜 Doc</Link>

                    {/* <Link to="/transcript">📜 Transcript</Link> */}
                </nav>
                <Routes>
                    <Route path="/record" element={<Recorder />} />
                    <Route path="/doc" element={<Doc />} />
                </Routes>
            </div>
        </Router>
    </header>
</div>
  );
}

export default App;
