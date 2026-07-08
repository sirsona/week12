// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const leadsRoutes = require("./src/routes/leads.routes");
const errorHandler = require("./src/middleware/errorHandler");
const requireAuth = require("./src/middleware/requireAuth");
const authRoutes = require("./src/routes/auth");

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
app.use("/auth", authRoutes);

app.use("/api/leads", requireAuth, leadsRoutes);

// app.use("/webhook", webhookRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

module.exports = app;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`CRM server running on : ${PORT}`);
  });
}
