import { createClient } from "redis";
const subscriber = createClient();

async function processSubmission(data: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Processed information is: ", data);
}

async function redisFunc() {
  try {
    await subscriber.connect();
  } catch (e) {
    console.log("Error connecting to redis");
    throw e;
  }

  while (true) {
    try {
      const data = await subscriber.brPop("queue1", 0);

      await processSubmission(data);
    } catch (err) {
      console.error("Some error occured popping from the queue");
    }
  }
}

redisFunc();
