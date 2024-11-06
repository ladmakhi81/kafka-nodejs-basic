const { Kafka, logLevel } = require("kafkajs");

const runAdmin = async () => {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
      logLevel: logLevel.NOTHING,
    });

    const admin = kafka.admin();

    await admin.connect();

    const createdTopics = await admin.listTopics();

    if (createdTopics.includes("nima")) {
      await admin.deleteTopics({ topics: ["nima"] });
    }

    await admin.createTopics({
      topics: [
        {
          topic: "nima",
          numPartitions: 2,
        },
      ],
    });

    await admin.disconnect();
  } catch (error) {
    console.log("error happen", error);
  }
};

runAdmin();
