import React from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "0 auto",
    maxWidth: 700,
    padding: theme.spacing.unit * 2
  }
});

let Container = props => {
  const { classes, children } = props;
  return <Paper className={classes.root}>{children}</Paper>;
};
Container = withStyles(styles)(Container);
export default Container;
