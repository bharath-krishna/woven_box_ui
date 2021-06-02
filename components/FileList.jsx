import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Fragment } from "react";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { connect } from "react-redux";
import { deleteFile, setFiles } from "../redux/actions/files";
import { useAuthUser } from "../utils/NextFirebaseAuth";
import FileDisplayDialog from "./FileDisplayDialog";

function FileList({ files, deleteFile }) {
  const authUser = useAuthUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [fileUrl, setFileUrl] = useState();
  const [fileTitle, setFileTitle] = useState();

  const handleDelete = async (name) => {
    const config = {
      headers: {
        Authorization: `Bearer ${await authUser.getIdToken()}`,
      },
    };
    const resp = axios
      .delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${name}`, config)
      .then((res) => {
        if (res.status == 200) {
          deleteFile(name);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleDialogOpen = (name) => {
    setFileUrl(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads/${name}`);
    setFileTitle(name);
    setOpenDialog(true);
  };
  return (
    <Fragment>
      <List>
        {files.length !== 0 ? (
          files.map((name, index) => {
            return (
              <Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <ImageIcon />
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      component={Button}
                      onClick={() => handleDialogOpen(name)}
                      variant="body1"
                      color="secondary"
                    >
                      {name}
                    </Typography>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => handleDelete(name)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </Fragment>
            );
          })
        ) : (
          <ListItem>
            <ListItemAvatar>
              <ImageIcon />
            </ListItemAvatar>
            <ListItemText>No Files...</ListItemText>
          </ListItem>
        )}
      </List>
      {openDialog && (
        <FileDisplayDialog
          open={openDialog}
          setOpen={setOpenDialog}
          url={fileUrl}
          title={fileTitle}
        />
      )}
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
    setFiles: (files) => dispatch(setFiles(files)),
    deleteFile: (file) => dispatch(deleteFile(file)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
