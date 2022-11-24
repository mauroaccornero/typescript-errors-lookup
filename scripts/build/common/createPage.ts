import fs from "fs";
import { Writable } from "stream";
import { NextFunction } from "express";

import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";

import logger from "../../data/common/logger";
import assembleMarkup from "./assembleMarkup";
import compressMarkup from "./compressMarkup";
import streamAsPromise from "./streamAsPromise";
import { state, IPageData } from "../../../common/types";
import AppWithProvider from "../../../src/app/AppWithProvider";

interface ICreatePageProps {
  state: state;
  pageData: IPageData;
  filePath: string;
}

const createPage = ({ state, pageData, filePath }: ICreatePageProps) => {
  const isProduction = process.env.NODE_ENV === "production";
  // prepare writable stream
  const result: Buffer[] = [];
  const writable = new Writable({
    write(chunk: Buffer, encoding: BufferEncoding, callback: NextFunction) {
      result.push(chunk);
      callback();
    },
  });

  // create React element
  const c = React.createElement(AppWithProvider, { state });

  // create html from react component
  const readable = renderToPipeableStream(c, {
    onShellReady() {
      readable.pipe(writable);
    },
    onError(err) {
      logger.error(err);
    },
  });

  // handle piped stream as a promise
  streamAsPromise(writable, result)
    .then((bodyMarkup) => {
      // merge html markup with react html
      let markup = assembleMarkup({ pageData, bodyMarkup, state });
      // compress code
      if (isProduction) {
        markup = compressMarkup(markup);
      }
      // write file
      fs.writeFile(filePath, markup, (err) => {
        if (err) {
          logger.error(err);
        }
        //logger.info(`${filePath} created.`)
      });
    })
    .catch((err) => logger.error(err));
};

export default createPage;
