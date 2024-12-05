import { createClient } from "redis";

const publisher = createClient();

export async function initRedis() {
  try {
    await publisher.connect();
  } catch (error) {
    console.log("Error Connecting to Redis : ", error);
  }
}

export async function publishToRedis(videoId: string, timestamp: number) {
  try {
    await publisher.publish(videoId, JSON.stringify({ timestamp }));
  } catch (error: unknown) {
    console.log(error);
  }
}
