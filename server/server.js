import express from "express";

const app = express();
const PORT = process.env.PORT || 5050;

app
  .get("/", (req, res) => {
    res.send(`<h1>Capstone Church Store Server</h1>`);
  })
  .listen(PORT, () =>
    console.log(`Server running on Port: ${PORT}.
To open in the browser Ctrl + right on this link http://localhost:${PORT}`)
  );
