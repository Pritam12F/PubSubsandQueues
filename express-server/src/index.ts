import express from "express";
import { createClient } from "redis";

const client = createClient();

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const { userId, language } = req.body;

  try {
    await client.lPush("queue1", JSON.stringify(userId, language));

    res.json({
      message: "Successfully pushed to queue!",
    });
  } catch (err) {
    console.error("Error occured: ", err);
    res.json({
      error: "Error occured!",
    });
  }
});

async function startServer() {
  try {
    await client.connect();

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  } catch (error) {
    console.log("Couldn't connect to redis");
  }
}

startServer();
