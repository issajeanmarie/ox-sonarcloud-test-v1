import moment from "moment";
import FileDownload from "js-file-download";

type Props = {
  file: File;
  name: string;
  fileFormat: string;
};

export const handleDownloadFile = ({ file, name, fileFormat }: Props) => {
  const date = moment().format("YYYY-MM-DD");
  FileDownload(file, `${name}-${date}.${fileFormat.toLocaleLowerCase()}`);
};
