const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const tokenRoutes = require("./routes/tokens");
const quoteRoutes = require("./routes/quotes");
const paramRoutes = require("./routes/params");
const blockchainRoutes = require("./routes/blockchains");

const app = express();

// Use the cors middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Use the routes
app.use("/tokens", tokenRoutes);
app.use("/quote", quoteRoutes);
app.use("/params", paramRoutes);
app.use("/blockchains", blockchainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
