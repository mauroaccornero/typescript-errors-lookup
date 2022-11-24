"use strict";

import fs from "fs";
import path from "path";
import rimraf from "rimraf";

import logger from "../data/common/logger";

import {
  CATEGORIES_FILE_PATH,
  NORMALIZED_FILE_PATH,
  TAGS_FILE_PATH,
} from "../common/constants";
import createPage from "./common/createPage";
import escapeHtml from "./common/escapeHtml";
import { DETAIL_FOLDER, DIST_FOLDER } from "./common/constants";
import checkFolder from "../common/checkFolder";
import { IError, state } from "../../common/types";
import writeJs from "./common/writeJs";
import tailwindBuild from "./common/tailwindBuild";
import webpackBuild from "./common/webpackBuild";

import jsonData from "../../data/json/normalized.json";
import tagsData from "../../data/json/tags.json";
import categoriesData from "../../data/json/categories.json";

const jsonDataArray = jsonData as IError[];

logger.info("Build data asset start. Please wait.");

rimraf.sync(path.resolve(__dirname, "../../dist"));

checkFolder(DIST_FOLDER + "/assets/js");

const errorsDataString = fs.readFileSync(NORMALIZED_FILE_PATH).toString();
const errorsTagsDataString = fs.readFileSync(TAGS_FILE_PATH).toString();
const errorsCategoriesDataString = fs
  .readFileSync(CATEGORIES_FILE_PATH)
  .toString();

// create main state js
const mainJsContent = `window.__STATE__.errorsData = ` + errorsDataString;
writeJs({ jsContent: mainJsContent, jsFileName: "state" });

// create tags state js
const tagsJsContent = `window.__STATE__.errorTags = ` + errorsTagsDataString;
writeJs({
  jsContent: tagsJsContent,
  jsFileName: "stateTags",
});

// create tags state js
const categoriesJsContent =
  `window.__STATE__.errorCategories = ` + errorsCategoriesDataString;
writeJs({
  jsContent: categoriesJsContent,
  jsFileName: "stateCategories",
});

const pageData = {
  meta: {
    seo: {
      title: "Typescript errors lookup",
      description: "A friendly search engine for Typescript errors",
    },
  },
};

const filePath = `${DIST_FOLDER}/index.html`;

// create index
const indexState: state = {
  errorsData: jsonDataArray,
  errorDetailData: null,
  errorTags: tagsData,
  errorCategories: categoriesData,
};
createPage({ state: indexState, pageData, filePath });

// check html detail folder exist
checkFolder(DETAIL_FOLDER);

// build detail pages
const l = jsonDataArray.length;
for (let k = 0; k < l; k++) {
  const m = jsonDataArray[k];
  const [code, message] = m;
  const pageData = {
    meta: {
      seo: {
        title: escapeHtml("Typescript - TS" + code + " - " + message),
        description: escapeHtml(
          "TS" + code + " - " + message + " details and links"
        ),
      },
    },
  };

  const detailState: state = {
    errorsData: jsonDataArray,
    errorDetailData: m,
    errorTags: tagsData,
    errorCategories: categoriesData,
  };

  createPage({
    state: detailState,
    pageData,
    filePath: `${DETAIL_FOLDER}/${code}.html`,
  });
}

logger.info("build done");

tailwindBuild();

fs.copyFile(
  "./assets/images/favicon.ico",
  DIST_FOLDER + "/favicon.ico",
  (err) => {
    if (err) throw err;
    logger.info("favicon copied");
  }
);

webpackBuild();
