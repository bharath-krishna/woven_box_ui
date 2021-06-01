import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuthUser } from "next-firebase-auth";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/files";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function CustomAppBar({ logoutUser }) {
  const user = useAuthUser();
  const classes = useStyles();

  const handleLogout = () => {
    logoutUser();
    user.signOut();
  };

  return (
    <div className={classes.appbar}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Woven Box
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
