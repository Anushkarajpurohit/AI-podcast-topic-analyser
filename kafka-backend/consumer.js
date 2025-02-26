require("dotenv").config();
const { Kafka } = require("kafkajs");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const nlp = require("compromise");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 5050 });
console.log("Connected consumer WebSocket server on port 5050");

const kafka = new Kafka({ clientId: "audio-app", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "audio-group" });

async function transcribeAudio(filePath) {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));
    form.append("model", "whisper-1");

    try {
        const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", form, {
            headers: {
                Authorization: `Bearer {OPENAI_TOKEN}`,// place your API key.
                ...form.getHeaders(),
            },
        });
        console.log("Transcription:", response.data.text);
        return response.data.text;
    } catch (error) {
        console.error("Whisper API Error:", error.response ? error.response.data : error.message);
        return null;
    }
}

function extractKeyTopics(text) {
    let doc = nlp(text);
    let topics = doc.nouns().out("array").slice(0, 5);
    let verbs = doc.verbs().out("array").slice(0, 3);
    return [...new Set([...topics, ...verbs])];
}

async function startConsumer() {
    await consumer.connect();
    await consumer.subscribe({ topic: "my-topic", fromBeginning: true });

    console.log("Kafka Consumer Ready...");

    await consumer.run({
        eachMessage: async ({ message }) => {
            const filePath = "received_audio.webm";
            fs.writeFileSync(filePath, Buffer.from(message.value));

            console.log("Received Audio from Kafka, Sending to Whisper API...");
            const transcription = await transcribeAudio(filePath);

            if (transcription) {
                const topics = extractKeyTopics(transcription);
                console.log("Trending Topics:", topics);

                const responseData = {
                    transcription,
                    topics,
                };

                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(responseData));
                    }
                });

                console.log("Transcription Completed:", transcription);
            }
        },
    });
}

startConsumer().catch(console.error);