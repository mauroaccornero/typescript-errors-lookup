import { IError, state } from "../../../../../common/types";

type findErrors = (
  input: string,
  errorsData: state["errorsData"]
) => IError[] | [];

const findErrors: findErrors = (input, errorsData) => {
  const inputLC = input.toLowerCase();
  return errorsData
    .filter((error) => {
      const [code, message] = error;
      const codeString = code.toString();
      const messageLc = message.toLowerCase();
      return (
        inputLC.indexOf(codeString) !== -1 ||
        codeString.indexOf(inputLC) !== -1 ||
        messageLc.indexOf(inputLC) !== -1
      );
    })
    .slice(0, 10);
};

export default findErrors;
