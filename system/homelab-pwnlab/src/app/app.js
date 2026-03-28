const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5555;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  fs.readdir(path.join(__dirname, "public/uploads"), (err, files) => {
    if (err) {
      console.error("Could not list files:", err);
      res.status(500).send("Error listing files.");
      return;
    }
    res.render("index", { files });
  });
});

app.post("/upload", (req, res) => {
  if (!req.body.fileName || !req.body.fileContent) {
    return res.status(400).send("File data missing.");
  }

  const filename = req.body.fileName;
  const filePath = path.join(__dirname, "public/uploads", filename);

  fs.writeFile(filePath, req.body.fileContent, (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).send("Failed to upload file.");
    }
    console.log("File saved successfully.");
    res.redirect("/");
  });
});

app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, "public/uploads", filename);
  res.download(filepath);
});

app.get("/restart", (req, res) => {
  res.send("Restarting server...");
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});