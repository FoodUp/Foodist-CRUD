import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    display: "block",
    minWidth: 150
  }
});

let MyTextField = props => {
  const { classes, ...otherProps } = props;
  return <TextField className={classes.textField} {...otherProps} />;
};

MyTextField = withStyles(styles)(MyTextField);
export default MyTextField;
