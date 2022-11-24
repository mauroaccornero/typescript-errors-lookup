import { existsSync, mkdirSync } from "fs";
import logger from "../data/common/logger";

const checkFolder = (path: string) => {
  if (!existsSync(path)) {
    logger.info(`${path} doesn't exist, creating.`);
    mkdirSync(path, { recursive: true });
  }
};

export default checkFolder;
