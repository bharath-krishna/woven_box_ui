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

function CustomAppBar({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.appbar}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Woven Box
          </Typography>
          <Button color="inherit" onClick={user.signOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default CustomAppBar;
