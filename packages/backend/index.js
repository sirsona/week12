// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const env = require("./config/env");

const leadsRoutes = require("./src/routes/leads.routes");
const errorHandler = require("./src/middleware/errorHandler");
// const webhookRoutes = require("./routes/webhook.routes");

const app = express();

app.use(cors({ origin: process.env.APP_URL || "http://localhost:3000" }));
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/leads", leadsRoutes);

// app.use("/webhook", webhookRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CRM server running on : ${PORT}`);
});
