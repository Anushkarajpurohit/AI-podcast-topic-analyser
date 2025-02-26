import React, { useState, useEffect } from "react";

const Transcript = () => {
    const [transcript, setTranscript] = useState("");

    useEffect(() => {

        const consumersocket = new WebSocket("ws://127.0.0.1:5050");
        consumersocket.onopen = () => console.log("Connected to consumer WebSocket");

        consumersocket.onmessage = (event) => {
            const data=JSON.parse(event.data);
            console.log(data.transcription);
            setTranscript(data.transcription);
            
        }

        consumersocket.onerror = (error) => console.error("Consumer WebSocket error:", error);
        consumersocket.onclose = () => console.warn("Consumer WebSocket closed");

    }, []);

    return (
        <div>
            <h1>📜 Transcript</h1>
            <p>{transcript }</p>
        </div>
    );
};

export default Transcript;
