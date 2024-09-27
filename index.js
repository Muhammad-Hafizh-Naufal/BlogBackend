import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import BlogRoute from "./routes/BlogRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(BlogRoute);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
