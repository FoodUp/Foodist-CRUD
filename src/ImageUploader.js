import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { relative } from "path";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  imageDiv: {
    position: "relative",
    borderRadius: 5,
    width: 400,
    height: 200,
    background: "#eee",
    textAlign: "center",
    boxSizing: "border-box"
  },
  imageWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class ImageUploader extends React.Component {
  state = {
    imagePreviewUrl: ""
  };

  handleImageUpload = e => {
    if (e.target.files[0]) {
      let fileReader = new FileReader();
      //update state imagePreviewUrl
      fileReader.onloadend = () => {
        this.setState({ imagePreviewUrl: fileReader.result });
      };
      fileReader.readAsDataURL(e.target.files[0]);
      this.props.handleImageChange(e.target.files[0]);
    }
  };

  render() {
    const { classes } = this.props;
    const imagePreviewer = this.state.imagePreviewUrl ? (
      <img height="150" src={this.state.imagePreviewUrl} alt="preview" />
    ) : (
      "No image"
    );
    return (
      <div>
        <div className={classes.imageDiv}>
          <div className={classes.imageWrapper}>{imagePreviewer}</div>
        </div>
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
            variant="outlined"
            color="primary"
          >
            Upload
          </Button>
        </label>
      </div>
    );
  }
}
ImageUploader.propTypes = {
  classes: PropTypes.object,
  handleImageChange: PropTypes.func
};
export default withStyles(styles)(ImageUploader);
