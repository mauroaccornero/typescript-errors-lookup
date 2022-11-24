import { IPageData, state } from "../../../common/types";

interface IAssembleMarkupParameters {
  pageData: IPageData;
  bodyMarkup: string;
  state: state;
}

const assembleMarkup = ({
  pageData,
  bodyMarkup,
  state,
}: IAssembleMarkupParameters): string => {
  const errorDetailDataString = JSON.stringify(state.errorDetailData);
  const devJS =
    process.env.NODE_ENV === "production"
      ? ["runtime", "vendors", "client"]
      : ["client"];
  const jsScript = devJS
    .map((js) => "<script defer src='/assets/js/" + js + ".js'></script>")
    .join("");
  // prettier-ignore
  return (
    `<!doctype html>
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://unpkg.com 'nonce-2726c7f26c';" />    
                <base href="` + process.env.BASE_URL + `" />           
                <title>` + pageData.meta.seo.title + `</title>
                <meta name="description" content="` + pageData.meta.seo.description + `" />
                <!-- tailwind css -->
                <link href="/assets/css/client.css" rel="stylesheet" />
                <!-- tailwind css -->
            </head>
            <body>
                <div id="app"><!-- htmlmin:ignore -->` + bodyMarkup + `<!-- htmlmin:ignore --></div>
                <script src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
                <script src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
                <script nonce="2726c7f26c">
                window.__STATE__ = {
                    errorsData: [],
                    errorCategories: [],
                    errorsTags: [],
                    errorDetailData: ` + errorDetailDataString +`
                }
                </script>
                <!-- fill data on window -->
                <script src="/assets/js/state.js"></script>
                <script src="/assets/js/stateTags.js"></script>
                <script src="/assets/js/stateCategories.js"></script>
                <!-- fill data on window -->
                <!-- webpack files -->
                ` + jsScript +`
                <!-- webpack files -->
            </body>
        </html>`
  );
};

export default assembleMarkup;
