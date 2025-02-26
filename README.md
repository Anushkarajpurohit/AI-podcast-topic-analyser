# AI Podcast Trending Topic Analyzer

## Overview
AI Podcast Trending Topic Analyzer is a **real-time transcription and topic analysis** system for podcasts. It uses **Kafka, Node.js, React, WebSockets, and Docker** to process live audio, convert it into text, and analyze trending topics.

## Features
- **Real-time audio transcription** using Kafka & speech-to-text APIs
- **Topic extraction and trend analysis** using NLP
- **WebSocket-based UI updates** for live transcripts
- **Scalable architecture** with Kafka for event-driven processing
- **Dockerized deployment** for easy setup

## Technologies Used
- **Frontend:** React, WebSockets
- **Backend:** Node.js, Express, KafkaJS
- **Streaming & Messaging:** Apache Kafka
- **Database:** MongoDB (optional for storing transcripts)
- **Deployment:** Docker, Docker Compose

---

## **Project Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/ai-podcast-trending-topic-analyzer.git
cd ai-podcast-trending-topic-analyzer
```

### **2. Start Kafka with Docker**
Kafka and Zookeeper are required. Use Docker Compose for setup:

```sh
docker-compose up -d
```

If you need a **manual setup**, run:
```sh
# Start Zookeeper
docker run -d --name zookeeper -p 2181:2181 zookeeper

# Start Kafka
docker run -d --name kafka \
  --link zookeeper \
  -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
  -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
  -p 9092:9092 \
  confluentinc/cp-kafka
```

### **3. Start the Backend (Node.js Server)**
```sh
cd backend
npm install
 #starts apps.js and consumer.js
npm start
```

### **4. Start the Frontend (React UI)**
```sh
cd frontend
npm install
npm start
```

---

## **Testing Kafka Producers & Consumers**
### **Check Messages in Kafka Topic**
```sh
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --from-beginning
```

### **Send Test Data to Kafka**
```sh
echo "Hello Kafka!" | kafka-console-producer.sh --broker-list localhost:9092 --topic my-topic
```
---

## **Deployment with Docker**

### **Build and Run Everything**
```sh
docker-compose up --build
```

### **Stop Services**
```sh
docker-compose down
```

---

