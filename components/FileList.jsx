import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { Fragment } from "react";
import ImageIcon from "@material-ui/icons/Image";

function FileList({ files }) {
  return (
    <Fragment>
      <List>
        {files ? (
          files.map((name, index) => {
            return (
              <Fragment key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <ImageIcon />
                  </ListItemAvatar>
                  <ListItemText>{name}</ListItemText>
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
