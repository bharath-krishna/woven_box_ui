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
import React, { useEffect, useRef, useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import FileList from "../components/FileList";
import { Alert } from "@material-ui/lab";
import { connect } from "react-redux";
import { setFiles } from "../redux/actions/files";
import {
  authAction,
  useAuthUser,
  withAuthUser,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "../components/FullPageLoader";
import UploadFIles from "../components/UploadFIles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5vh",
  },
  input: {
    display: "none",
    width: "200px",
  },
  leftCard: {
    display: "flex",
  },
  fileListCard: {},
}));

function index({ files, setFiles }) {
  const authUser = useAuthUser();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);
  const [severity, setSeverity] = useState("success");
  const [transactionMessage, setTransactionMessage] = useState("");

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${await authUser.getIdToken()}`,
      },
    };
    const resp = axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/uploads`, config)
      .then((res) => {
        setFiles(res.data.filenames);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const resetFiles = () => {
    // TODO: Reset files list in redux state
    // instead of fetchin from server
    getFiles();
  };

  function TransitionRight(props) {
    return <Slide {...props} direction="right" timeout={1000} />;
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
      <CustomAppBar user={authUser} />
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
            <TextField
              name="searchName"
              variant="outlined"
              placeholder="Search Files"
              size="small"
              onChange={handleFilter}
              fullWidth
            />
            <FileList getFiles={getFiles} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <UploadFIles showMessage={showMessage} resetFiles={resetFiles} />
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

export default withAuthUser({
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  whenUnauthedAfterInit: authAction.REDIRECT_TO_LOGIN,
  whenUnauthed: authAction.REDIRECT_TO_LOGIN,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(connect(mapStateToProps, mapDispatchToProps)(index));
