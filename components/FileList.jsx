import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Fragment } from "react";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { connect } from "react-redux";
import { setFiles } from "../redux/actions/files";
import { useAuthUser } from "../utils/NextFirebaseAuth";

function FileList({ files, getFiles }) {
  const authUser = useAuthUser();
  const handleDelete = async (name) => {
    const config = {
      headers: {
        Authorization: `Bearer ${await authUser.getIdToken()}`,
      },
    };
    const resp = axios
      .delete(`http://localhost:8088/api/uploads?filename=${name}`, config)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          getFiles();
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
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
                  <ListItemText>{name}</ListItemText>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileList);
