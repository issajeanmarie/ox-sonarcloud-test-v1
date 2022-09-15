import { handleDownloadFile } from "../../../utils/handleDownloadFile";

export const handleDownloadSuccess = (file: File) => {
  handleDownloadFile({ file, name: "OOS Report", fileFormat: "PDF" });
};
