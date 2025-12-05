import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("hello hono");
});

const port = 8080;

serve({
  fetch: app.fetch,
  port,
});
