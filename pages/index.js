import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomAppBar from "../components/CustomAppBar";
import ImageIcon from "@material-ui/icons/Image";
import FileList from "../components/FileList";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5vh",
  },
  input: {
    display: "flex",
    width: "200px",
  },
  leftCard: {
    display: "flex",
  },
}));

function index() {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [files, setFiles] = useState();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [severity, setSeverity] = useState("success");
  const [transactionMessage, setTransactionMessage] = useState("");

  useEffect(() => {
    const resp = axios
      .get("http://localhost:8088/api/uploads")
      .then((res) => {
        setFiles(res.data.filenames);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [open]);

  const onSubmit = async (data) => {
    if (data.filename[0]) {
      const formData = new FormData();
      formData.append("uploaded_files", data.filename[0]);

      const resp = await axios
        .post("http://localhost:8088/api/uploads", formData)
        .then((res) => {
          if (res.status == 200) {
            showMessage("Upload Successful");
            reset();
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const showMessage = (msg, severity) => {
    setSeverity(severity);
    setTransactionMessage(msg);
    setTransition(() => TransitionLeft);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Do not close on clickaway
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CustomAppBar />
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <Card className={classes.leftCard}>
              <CardContent>
                <Typography variant="h6" color="secondary">
                  Filter by
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Card>
              <CardContent>
                <FileList files={files} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("filename")}
                type="file"
                className={classes.input}
              />
              <Button type="submit">Upload</Button>
            </form>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        TransitionComponent={transition}
        key={transition ? transition.name : ""}
      >
        <Alert onClose={handleClose} severity={severity}>
          {transactionMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};

export default index;
