import htmlMinifier from "html-minifier";

const compressMarkup = (markup: string) =>
  htmlMinifier.minify(markup, {
    minifyJS: true,
    removeComments: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true,
  });

export default compressMarkup;
