import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const ImageUploader = props => {
  const { classes } = props;
  return (
    <div>
      <label htmlFor="flat-button-file">
        <input
          accept="image/*"
          id="flat-button-file"
          type="file"
          multiple
          className={classes.input}
        />
        <Button
          className={classes.button}
          component="span"
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </label>
    </div>
  );
};
export default withStyles(styles)(ImageUploader);
