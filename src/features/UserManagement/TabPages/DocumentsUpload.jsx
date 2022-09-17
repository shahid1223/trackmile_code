import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Button } from "../../../components/Form";

const MAX_COUNT = 6;
const COLORS = {
    orange: "#F6930A",
    green: "#3CAB41",
    primary: "21366F"
}
const DocumentsUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };
  const handleSubmitFiles = (chosenFiles) => {
    console.log(chosenFiles)
  }

  return (
    <>
      <div className="form-group mb-3 ">
        <div className="d-flex">
          <input
            id="fileUpload"
            className="d-none"
            type="file"
            multiple
            accept="application/pdf, image/png, imgage/jpg, image/jpeg"
            onChange={handleFileEvent}
            disabled={fileLimit}
          />

          <label htmlFor="fileUpload">
            <a
              className={`btn btn-primary ${!fileLimit ? "" : "disabled"} `}
              style={{backgroundColor: COLORS.orange, borderColor: COLORS.orange}}
            >
              <FaUpload className="me-2" color="white" size={20} /> Upload Documents
            </a>
          </label>
        </div>

        <div className="p-3 mb-5">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="mb-1">
              <div className="col">
                <div className="row ">
                  {index+1}. {file.name}
                </div>
              </div>
            </div>
          ))}
        </div>
            
        <div className="row">
            <div className="col-9"></div>
            <div className="col-2">
                <Button color={COLORS.green} className="my-3" onClick={()=>{handleSubmitFiles(uploadedFiles)}} title="Submit" />
            </div>
        </div>
      </div>
    </>
  );
};

export default DocumentsUpload;
