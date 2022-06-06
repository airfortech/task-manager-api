import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());

app.get("/", async (req, res) => {
  res.json({ test: "ok" });
});

app.listen(3001, () => {
  console.log("Server started...");
});
