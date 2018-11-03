import React from "react";
import { PropTypes } from "prop-types";
import MyTextField from "./TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";

const IngredientItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <div>
      <span>
        {item.name} - {item.amount} {item.unit}
      </span>
      <button onClick={handleDeleteItem}>x</button>
    </div>
  );
};
IngredientItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    amount: PropTypes.string,
    unit: PropTypes.string
  }),
  id: PropTypes.number,
  deleteItem: PropTypes.func
};

class NewIngredientItem extends React.Component {
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
    if (this.state.name.trim() !== "" && this.state.amount.trim() !== "") {
      this.props.newItem(this.state.name, this.state.amount, this.state.unit);
      this.setState({ name: "", amount: "", unit: "" });
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
            label="Amount"
            value={this.state.amount}
            onChange={this.onFieldChange("amount")}
          />{" "}
          <MyTextField
            label="Unit"
            value={this.state.unit}
            onChange={this.onFieldChange("unit")}
          />
        </FormGroup>
        <Button onClick={this.onSubmit} variant="contained" color="primary">
          submit
        </Button>
      </div>
    );
  }
}
NewIngredientItem.propTypes = {
  newItem: PropTypes.func
};

class IngredientsList extends React.Component {
  render() {
    const itemsList = this.props.items.map((item, idx) => {
      return (
        <IngredientItem
          key={idx}
          id={idx}
          item={item}
          deleteItem={this.props.deleteIngredientItemAtIdx}
        />
      );
    });
    return (
      <div>
        {itemsList}
        <NewIngredientItem newItem={this.props.createIngredientItem} />
      </div>
    );
  }
}
IngredientsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, amount: PropTypes.string })
  ).isRequired,
  createIngredientItem: PropTypes.func.isRequired,
  deleteIngredientItemAtIdx: PropTypes.func.isRequired
};
export default IngredientsList;
