import express from "express";
import { addUserToCourse } from "./utils/course";
import { Queue } from "bullmq";
import { REDIS_CLIENT } from "./secrets";


const app = express();
const PORT = process.env.PORT || 8000;

const email_queue = new Queue('email-queue', {
  connection: REDIS_CLIENT,
});

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "No, no lo diga asi no" });
});

app.post("/add-user-to-course", async (req, res) => {
  await addUserToCourse();

  await email_queue.add(`${Date.now}`, {
    from: "tbl@gmail.com",
    to: "vintcerf@gmail.com",
    subject: "Welcome to the course",
    body: "You have been added to the course",
  });

  return res.json({ status: "success", message: "User added to course" });

});

app.listen(PORT, () => console.log(`Express Server Started on PORT:${PORT}`));
