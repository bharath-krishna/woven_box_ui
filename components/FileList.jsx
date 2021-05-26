import {
  Button,
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

function FileList({ files, getFiles }) {
  const handleDelete = (name) => {
    console.log(name);
    const resp = axios
      .delete(`http://localhost:8088/api/uploads?filename=${name}`)
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

export default FileList;
