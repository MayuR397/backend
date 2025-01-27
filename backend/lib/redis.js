import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);



// import Redis from "ioredis"

// const client = new Redis("rediss://default:AeCJAAIjcDE0NWU0MjQ2M2FlY2Y0OTliYjBmOTA0MjUzNjQ1OWM0MnAxMA@cosmic-moth-57481.upstash.io:6379");
// await client.set('foo', 'bar');