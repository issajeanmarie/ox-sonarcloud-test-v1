import moment from "moment";
import FileDownload from "js-file-download";

export const handleDownloadFile = (
  file: any,
  name: string,
  fileFormat: string
) => {
  const date = moment().format("YYYY-MM-DD");
  FileDownload(file, `${name}-${date}.${fileFormat.toLocaleLowerCase()}`);
};
