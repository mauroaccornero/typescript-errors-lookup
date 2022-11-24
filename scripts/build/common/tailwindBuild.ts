import { spawn } from "child_process";
import logger from "../../data/common/logger";

const tailwindBuild = () => {
  logger.info(`tailwindcss build start`);
  const isProduction = process.env.NODE_ENV === "production";

  const commandArguments = [
    "--input ",
    "./assets/style/main.css",
    "--output",
    "./dist/assets/css/client.css",
  ];

  if (isProduction) {
    commandArguments.push("--minify");
  }

  const tw = spawn("npx tailwindcss", commandArguments, {
    env: process.env,
    shell: true,
  });

  tw.on("error", (err) => {
    if (err) {
      logger.error(
        `TailwindCSS encountered some error: ${JSON.stringify(err)}`
      );
    }
  });

  tw.on("close", (code) => {
    logger.info(`TailwindCSS build completed with code ${code}`);
  });
};

export default tailwindBuild;
