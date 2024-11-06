const { Kafka, logLevel } = require("kafkajs");

const runConsumer = async () => {
  const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "consumer",
    logLevel: logLevel.NOTHING,
  });

  const consumer = kafka.consumer({ groupId: "consumer-1" });

  await consumer.connect();

  await consumer.subscribe({ topic: "nima", fromBeginning: true });

  await consumer.run({
    eachMessage: (payload) => {
      console.log(
        "consumer 1 receive message: ",
        payload.message.value.toString()
      );
    },
  });
};

runConsumer();
