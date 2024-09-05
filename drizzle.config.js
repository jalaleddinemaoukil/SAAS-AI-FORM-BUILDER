import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://aiformbuilder_owner:H8XAVjdr9Lti@ep-restless-band-a5917j3q.us-east-2.aws.neon.tech/aiformbuilder?sslmode=require",
  }
});
