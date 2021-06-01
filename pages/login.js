import React, { Fragment } from "react";
import FirebaseAuth from "../components/FirebaseAuth";
import {
  authAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "../utils/NextFirebaseAuth";
import FullPageLoader from "../components/FullPageLoader";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 150,
  },
}));

function Auth() {
  const classes = useStyles();

  return (
    <Fragment>
      <Container className={classes.container}>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h3" color="primary">
              Welcome to Woven Box
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              Use your google account to signin. If its first time signing in
              then click on "Trouble Signing in" and follow the instructions
            </Typography>
          </Grid>
          <Grid item>
            <FirebaseAuth />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: authAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: authAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: authAction.SHOW_LOADER,
  LoaderComponent: () => {
    return <FullPageLoader />;
  },
})(Auth);
