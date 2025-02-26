import React, { useState, useEffect } from "react";
import "../styling/doc.css"
const Doc = () => {
    const [transcript, setTranscript] = useState("");

    

    return (
        <div className="doc-main">
            <h1>AI Podcast Trending Topic Analyzer</h1>
            <h2><b>Overview</b></h2>
    <p>The AI Podcast Trending Topic Analyzer is a real-time system that processes podcast audio, converts it to text, extracts trending topics, and displays the insights on a user interface.</p>
    
            <h2><b>Technologies Used</b></h2>
<p><b>Frontend:</b> React (Use of essential hooks:useState,useRef,useState)</p>
<p><b>Backend:</b> Node.js with Express (handling WebSocket connections, integrating Kafka)</p>
<p><b>Message Queue:</b> Apache Kafka (streaming podcast transcripts and topics)</p>
<p><b>WebSockets:</b> Real-time communication between the frontend, backend, and Kafka consumers.</p>
<p><b>Speech-to-Text:</b> AI-based API for converting speech to text</p>
<p><b>Natural Language Processing (NLP):</b> Extracts trending topics from the transcribed text.</p>
<p><b>Docker:</b> Containerized Kafka, Zookeeper, and backend services.</p>

<h2><b>Flow of the Application</b></h2>
<h3><b>1. Audio Recording</b></h3>
<p>The user records a podcast snippet using the frontend UI.</p>

<h3><b>2. WebSocket Communication</b></h3>
<p>The recorded audio is sent via WebSockets to the Node.js backend.</p>

<h3><b>3. Speech-to-Text Processing</b></h3>
<p>The backend sends the audio data to a Speech-to-Text API, converting the speech into text.</p>

<h3><b>4. Kafka Message Queue</b></h3>
<p>The transcribed text is sent as a Kafka message to a dedicated topic.</p>

<h3><b>5. Topic Analysis</b></h3>
<p>A consumer service listens to the Kafka topic and extracts trending topics from the transcript.</p>

<h3><b>6. WebSocket Update to Frontend</b></h3>
<p>The extracted topics are sent back to the frontend via WebSockets and displayed in real time.</p>

<h3><b>7. Displaying Results</b></h3>
<p>The UI updates with the latest transcription and trending topics.</p>
        </div>
    );
};

export default Doc;
