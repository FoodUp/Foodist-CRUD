import React from "react";
import { PropTypes } from "prop-types";
import MyTextField from "./TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    height: "100%",
    margin: theme.spacing.unit,
    alignSelf: "flex-end",
    marginLeft: "auto"
  }
});

class NewIngredientItem extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    amount: "",
    unit: ""
  };
  onFieldChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.name.trim() !== "") {
      this.props.newItem(this.state.name, this.state.amount, this.state.unit);
      this.setState({ name: "", amount: "", unit: "" });
    }
  };
  render() {
    return (
      <div>
        <FormGroup row={true}>
          <MyTextField
            required
            label="Name"
            value={this.state.name}
            onChange={this.onFieldChange("name")}
          />
          <MyTextField
            label="Amount"
            value={this.state.amount}
            onChange={this.onFieldChange("amount")}
          />{" "}
          <MyTextField
            label="Unit"
            value={this.state.unit}
            onChange={this.onFieldChange("unit")}
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
NewIngredientItem.propTypes = {
  newItem: PropTypes.func,
  classes: PropTypes.shape({
    button: PropTypes.string
  })
};
export default withStyles(styles)(NewIngredientItem);
