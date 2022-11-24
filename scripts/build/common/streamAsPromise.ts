import * as Stream from "stream";

const streamAsPromise = (writable: Stream, result: Buffer[]) =>
  new Promise((resolve, reject) => {
    writable.on("finish", resolve);
    writable.on("error", reject);
  }).then(() => result.join(""));

export default streamAsPromise;
