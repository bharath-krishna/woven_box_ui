import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "../utils/NextFirebaseAuth";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
    },
    [theme.breakpoints.up("sm")]: {
      width: 600,
    },
  },
  avatar: {
    width: "fit-content",
    height: "fit-content",
  },
}));

function FileDisplayDialog({ open, setOpen, url, title }) {
  const classes = useStyles();
  const authUser = useAuthUser();
  const [href, setHref] = useState("");

  useEffect(async () => {
    console.log(url, "url");

    const result = await fetch(url, {
      headers: { Authorization: `Bearer ${await authUser.getIdToken()}` },
    });

    const blob = await result.blob();
    setHref(window.URL.createObjectURL(blob));
  }, []);
  return (
    <Dialog
      fullWidth={600}
      maxWidth={600}
      open={open}
      onClose={() => setOpen(false)}
      className={classes.dialog}
    >
      <DialogTitle>
        <Typography variant="body1" color="secondary">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {href && (
          <Avatar variant="square" className={classes.avatar} src={href} />
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled>Download</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FileDisplayDialog;
