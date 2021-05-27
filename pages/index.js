import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Slide,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomAppBar from "../components/CustomAppBar";
import FileList from "../components/FileList";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { setFiles } from "../redux/actions/files";

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
  fileListCard: {},
}));

function index({ files, setFiles }) {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [severity, setSeverity] = useState("success");
  const [transactionMessage, setTransactionMessage] = useState("");

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    const resp = axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads`)
      .then((res) => {
        setFiles(res.data.filenames);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("uploaded_files", data.filename[0]);

    const resp = await axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads`, formData)
      .then((res) => {
        if (res.status == 200) {
          showMessage("Upload Successful");
          reset();
          getFiles();
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }

  const showMessage = (msg, severity) => {
    setSeverity(severity);
    setTransactionMessage(msg);
    setTransition(() => TransitionRight);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Do not close on clickaway
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleFilter = (e) => {
    const searchName = e.target.value;
    if (searchName != "") {
      setFiles(files.filter((name) => name.includes(searchName)));
    } else {
      getFiles();
    }
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
          <Grid item xs={12} sm={6}>
            {/* <Card className={classes.fileListCard}>
              <CardContent> */}
            <TextField
              name="searchName"
              variant="outlined"
              placeholder="Search Files"
              size="small"
              onChange={handleFilter}
              fullWidth
            />
            <FileList getFiles={getFiles} />
            {/* </CardContent>
            </Card> */}
          </Grid>
          <Grid item xs={12} sm={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("filename")}
                type="file"
                className={classes.input}
                required
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

export default connect(mapStateToProps, mapDispatchToProps)(index);
