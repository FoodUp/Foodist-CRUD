import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class ImageUploader extends React.Component {
  state = {
    imagePreviewUrl: ""
  };

  handleImageUpload = e => {
    let fileReader = new FileReader();
    //update state imagePreviewUrl
    fileReader.onloadend = () => {
      this.setState({ imagePreviewUrl: fileReader.result });
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { classes } = this.props;
    const imagePreviewer = this.state.imagePreviewUrl ? (
      <img height="100" src={this.state.imagePreviewUrl} alt="preview" />
    ) : (
      ""
    );
    return (
      <div>
        <label htmlFor="flat-button-file">
          <input
            accept="image/*"
            id="flat-button-file"
            type="file"
            className={classes.input}
            onChange={this.handleImageUpload}
          />
          <Button
            className={classes.button}
            component="span"
            variant="contained"
            color="primary"
          >
            Upload
          </Button>
          {imagePreviewer}
        </label>
      </div>
    );
  }
}
ImageUploader.propTypes = {
  classes: PropTypes.object
};
export default withStyles(styles)(ImageUploader);
