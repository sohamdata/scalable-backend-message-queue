import express from "express";
import { addUserToCourse } from "./utils/course";
import EmailService from "./utils/email";

const app = express();
const PORT = process.env.PORT || 8000;

const emailService = new EmailService();

app.get("/", (req, res) => {
  return res.json({ status: "success", message: "No, no lo diga asi no" });
});

app.post("/add-user-to-course", async (req, res) => {
  await addUserToCourse();

  const response = await emailService.sendEmail({
    from: "tbl@gmail.com",
    to: "vintcerf@gmail.com",
    subject: "Welcome to the course",
    body: "You have been added to the course",
  });

  if (response) {
    return res.json({ status: "success", message: "User added to course" });
  }
  return res.json({ status: "error", message: "probably rate limited" });

});

app.listen(PORT, () => console.log(`Express Server Started on PORT:${PORT}`));
