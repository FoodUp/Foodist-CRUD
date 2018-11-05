import React from "react";
import { PropTypes } from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import MyTextField from "./TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    height: "100%",
    margin: theme.spacing.unit,
    alignSelf: "flex-end",
    marginLeft: "auto"
  }
});
class NewToolItem extends React.Component {
  state = {
    name: "",
    quantity: ""
  };
  constructor(props) {
    super(props);
  }
  onFieldChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() !== "" && this.state.quantity.trim() !== "") {
      this.props.newItem(this.state.name, this.state.quantity);
      this.setState({ name: "", quantity: "" });
    }
  };
  render() {
    return (
      <div>
        <FormGroup row={true}>
          <MyTextField
            label="Name"
            value={this.state.name}
            onChange={this.onFieldChange("name")}
          />
          <MyTextField
            type="number"
            label="Quantity"
            value={this.state.quantity}
            onChange={this.onFieldChange("quantity")}
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
      </div>
    );
  }
}
NewToolItem.propTypes = {
  newItem: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(NewToolItem);
