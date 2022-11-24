"use strict";

import express from "express";
import logger from "../data/common/logger";

const PORT = 4444;

const app = express();

app.use(express.static("dist"));

app.listen(PORT, () => {
  logger.info(`Dev server listening on port ${PORT}`);
});
