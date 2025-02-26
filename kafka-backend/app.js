const WebSocket = require("ws");
const fs = require("fs");
const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "audio-app", brokers: ["localhost:9092"] });
const producer = kafka.producer();
const wss = new WebSocket.Server({ port: 5000 });

wss.on("connection", async (ws) => {
    console.log("Client connected at 5000");
    await producer.connect();  // Connect Kafka Producer

    ws.on("message", async (audioBuffer) => {
        console.log("Received audio from client");

        const filePath = `audio_${Date.now()}.webm`;
        fs.writeFileSync(filePath, audioBuffer); 

        await producer.send({
            topic: "my-topic",
            messages: [{ value: fs.readFileSync(filePath) }],
        });

        console.log("Audio sent to Kafka Producer");
        fs.unlinkSync(filePath); // Cleanup
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});



