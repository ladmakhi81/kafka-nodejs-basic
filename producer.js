const { Kafka, logLevel } = require("kafkajs");

const run = async () => {
  const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "producer",
    logLevel: logLevel.NOTHING,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "nima",
    messages: [
      {
        value: "hello from youtube",
      },
    ],
  });

  await producer.disconnect();
};

run();
