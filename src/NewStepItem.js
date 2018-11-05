import React from "react";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";
import MyTextField from "./TextField";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";

const styles = theme => ({
  button: {
    height: "100%",
    margin: theme.spacing.unit,
    alignSelf: "flex-end",
    marginLeft: "auto"
  }
});
class NewStepItem extends React.Component {
  state = {
    step: ""
  };
  onChange = e => {
    this.setState({ step: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.step.trim() !== "") {
      this.props.newItem(this.state.step);
      this.setState({ step: "" });
    }
  };
  render() {
    return (
      <FormGroup row={true}>
        <MyTextField
          label="New Step"
          value={this.state.step}
          onChange={this.onChange}
          multiline={true}
          fullWidth
        />
        <Button
          onClick={this.onSubmit}
          variant="outlined"
          color="primary"
          className={this.props.classes.button}
        >
          Add
        </Button>
      </FormGroup>
    );
  }
}
NewStepItem.propTypes = {
  newItem: PropTypes.func,
  classes: PropTypes.object
};
export default withStyles(styles)(NewStepItem);
