import fs from "fs";
import logger from "../../data/common/logger";
import { DIST_FOLDER } from "./constants";

interface ICreateJsProps {
  jsContent: string;
  jsFileName: string;
}

const writeJs = ({ jsFileName, jsContent }: ICreateJsProps) => {
  fs.writeFile(
    `${DIST_FOLDER}/assets/js/${jsFileName}.js`,
    jsContent,
    (err) => {
      if (err) {
        logger.error(err);
      }
      //logger.info(`${jsFileName}.js created.`)
    }
  );
};

export default writeJs;
