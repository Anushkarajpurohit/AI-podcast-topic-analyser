
import React, { useState, useRef, useEffect } from "react";
import "../styling/recorder.css"

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [topics, setTopics] = useState([]);
    const [ws, setWs] = useState(null);
    const [consumerWs, setConsumerWs] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const socket = new WebSocket("ws://127.0.0.1:5000"); // Producer WebSocket
        socket.onopen = () => console.log("Connected to producer WebSocket");
        setWs(socket);
    
        const consumersocket = new WebSocket("ws://127.0.0.1:5050"); // Consumer WebSocket
        consumersocket.onopen = () => console.log("Connected to consumer WebSocket");
        setConsumerWs(consumersocket);
    
        consumersocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setTranscript(data.transcription);
        
            setTopics((prevTopics) => {
                const newTopics = [...data.topics]; 
                return newTopics;
            });
        };
    
      
        // Cleanup function to close WebSocket connections when the component unmounts
        return () => {
            if (socket) socket.close();
            if (consumersocket) consumersocket.close();
        };
    }, []);
    const startRecording = async () => {
        if (isRecording) return; // Prevent multiple recordings

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });

            // Convert Blob to ArrayBuffer to  send via WebSocket
            const reader = new FileReader();
            reader.readAsArrayBuffer(audioBlob);
            reader.onloadend = () => {
                if (ws && ws.readyState === WebSocket.OPEN) {
                    ws.send(reader.result); //binari format 
                }
            };

            setIsRecording(false);
        };

        mediaRecorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }

    };

    return (
        <div className="container">
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            <p>{isRecording ? "🎤 Recording..." : "Click to start recording"}</p>

            {isRecording && <div className="recording-visual"></div>} 

            <h3>Transcription:</h3>
            <p>{transcript}</p>

            <h3>🔥 Trending Topics:</h3>
            <ul>
                {topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                ))}
            </ul>
        </div>
    );
};

export default AudioRecorder;