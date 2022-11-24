import { useContext } from "react";
import { Card, Link } from "../components/Layout/components";
import { AppContext } from "../context/appContext";
import { HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { ERROR_PATH } from "../common/constants";

const Detail = () => {
  const {
    state: { errorDetailData, errorTags, errorCategories, errorsData },
  } = useContext(AppContext);

  if (!errorDetailData) {
    return null;
  }

  const [code, message, categoryIndex, tagsIndexes] = errorDetailData;
  const gitHubSearchTerms = encodeURIComponent(`${message}`);
  const stackOverflowSearchTerms = encodeURIComponent(`typescript ${message}`);
  const googleSearchTerms = encodeURIComponent(`typescript ${code} ${message}`);
  const errorName = `TS${code} - ${message}`;
  const gitHubLink = `https://github.com/microsoft/TypeScript/issues?q=${gitHubSearchTerms}`;
  const stackOverflowLink = `https://stackoverflow.com/search?tab=votes&q=${stackOverflowSearchTerms}`;
  const googleLink = `https://www.google.com/search?q=${googleSearchTerms}`;
  const tags = tagsIndexes.map((i) => errorTags[i]);
  const category = errorCategories[categoryIndex];
  const currentErrorIndex = errorsData.findIndex((e) => e[0] === code);
  const prevError = errorsData[currentErrorIndex - 1];
  const nextError = errorsData[currentErrorIndex + 1];

  return (
    <>
      <Card>
        <h1 className="mb-3 font-bold">{errorName}</h1>
        <h2 className="text-md mb-3 font-bold">Category: {category}</h2>

        <small className="text-slate-800">
          <strong>Present in versions:</strong> {tags.join(",")}
        </small>

        <dl>
          <dt className="mb-3 mt-3 font-bold text-slate-600">Useful links</dt>
          <dd className="mb-1">
            <Link
              link={gitHubLink}
              title={`Typescript issues about ${errorName} on Github`}
              target="_blank"
              className="text-xs underline"
            >
              Microsoft Typescript issues about {errorName} on Github
            </Link>
          </dd>
          <dd className="mb-1">
            <Link
              link={stackOverflowLink}
              title={`Questions about ${errorName} on Stackoverflow`}
              target="_blank"
              className="text-xs underline"
            >
              Stackoverflow questions about {errorName}
            </Link>
          </dd>
          <dd className="mb-1">
            <Link
              link={googleLink}
              title={`Google results about ${errorName}`}
              target="_blank"
              className="text-xs underline"
            >
              Google search for {errorName}
            </Link>
          </dd>
        </dl>
      </Card>
      <ul className="flex justify-between text-slate-600">
        {prevError && (
          <li className="mr-auto">
            <Link
              className="flex items-center underline"
              path={`${ERROR_PATH}/${prevError[0]}.html`}
            >
              <HiArrowSmLeft /> TS{prevError[0]}{" "}
              <span className="invisible md:visible">- {prevError[1]}</span>
            </Link>
          </li>
        )}
        {nextError && (
          <li className="ml-auto">
            <Link
              className="flex items-center underline"
              path={`${ERROR_PATH}/${nextError[0]}.html`}
            >
              TS{nextError[0]}{" "}
              <span className="invisible md:visible">- {nextError[1]}</span>{" "}
              <HiArrowSmRight />
            </Link>
          </li>
        )}
      </ul>
    </>
  );
};

export default Detail;
