import { Button, LinearProgress, List, Typography } from "@material-ui/core";
import axios from "axios";
import React, { Fragment, useRef, useState } from "react";
import { connect } from "react-redux";
import { setFiles, addFiles } from "../redux/actions/files";
import { useAuthUser } from "../utils/NextFirebaseAuth";

function UploadFIles({ files, addFiles }) {
  const authUser = useAuthUser();
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [progressText, setprogressText] = useState({});

  const handleOnChange = (e) => {
    setSelectedFiles([]);
    setUploadProgress({});
    setprogressText({});
    for (let i = 0; i < e.target.files.length; i++) {
      setSelectedFiles((prevSelectedFiles) => {
        return [...prevSelectedFiles, e.target.files[i]];
      });
    }
  };

  const handleUpload = async () => {
    const headers = {
      Authorization: `Bearer ${await authUser.getIdToken()}`,
    };

    const fd = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      fd.append("uploaded_files", selectedFiles[i]);

      setprogressText((prevProgressText) => {
        return {
          ...prevProgressText,
          ...{ [selectedFiles[i].name]: "Uploading..." },
        };
      });
      axios
        .post(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads`, fd, {
          headers,
          onUploadProgress: (progressEvent) => {
            const uploaded = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );

            setUploadProgress((prevUploadProgress) => {
              return {
                ...prevUploadProgress,
                ...{ [selectedFiles[i].name]: uploaded },
              };
            });
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setprogressText((prevProgressText) => {
              return {
                ...prevProgressText,
                ...{ [selectedFiles[i].name]: "Done." },
              };
            });
            addFiles([selectedFiles[i].name]);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  const handleClear = () => {
    inputRef.current.value = "";
    setSelectedFiles([]);
  };

  return (
    <Fragment>
      <form>
        <input
          name="files"
          type="file"
          style={{
            display: "none",
          }}
          onChange={handleOnChange}
          ref={inputRef}
          multiple
        />
        <Button onClick={() => inputRef.current.click()} variant="contained">
          Select File(s)
        </Button>
        <Button
          onClick={() => handleUpload()}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
        <Button onClick={() => handleClear()}>Clear</Button>
        <List>
          {selectedFiles.map((file, index) => {
            return (
              <Fragment key={index}>
                <Typography variant="body1" color="secondary">
                  {file.name}
                </Typography>
                {progressText[file.name]} {uploadProgress[file.name] || 0}%
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress[file.name] || 0}
                />
              </Fragment>
            );
          })}
        </List>
      </form>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    files: state.files,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFiles: (func) => dispatch(addFiles(func)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFIles);
