import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: "block",
    width: 200
  }
});

let MyTextField = props => {
  const { classes, ...otherProps } = props;
  return (
    <TextField className={classes.textField} {...otherProps} margin="normal" />
  );
};

MyTextField = withStyles(styles)(MyTextField);
export default MyTextField;
