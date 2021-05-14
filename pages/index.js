import { Container, makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

function index({ cookies, allCookies }) {
  const classes = useStyles();
  const router = useRouter();

  return <Container className={classes.container}>index Page</Container>;
}

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {},
  };
};

export default index;
