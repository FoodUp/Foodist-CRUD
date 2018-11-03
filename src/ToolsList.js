import React from "react";
import { PropTypes } from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import MyTextField from "./TextField";
const ToolItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <div>
      <span>
        {item.name} {item.quantity}
      </span>
      <button onClick={handleDeleteItem}>x</button>
    </div>
  );
};
ToolItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.string
  }),
  id: PropTypes.number,
  deleteItem: PropTypes.func
};

class NewToolItem extends React.Component {
  state = {
    name: "",
    quantity: ""
  };
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
            label="Quantity"
            value={this.state.quantity}
            onChange={this.onFieldChange("quantity")}
          />
        </FormGroup>
        <Button onClick={this.onSubmit} variant="contained" color="primary">
          submit
        </Button>
      </div>
    );
  }
}
NewToolItem.propTypes = {
  newItem: PropTypes.func
};

class ToolsList extends React.Component {
  render() {
    const itemsList = this.props.items.map((item, idx) => {
      return (
        <ToolItem
          key={idx}
          id={idx}
          item={item}
          deleteItem={this.props.deleteToolItemAtIdx}
        />
      );
    });
    return (
      <div>
        {itemsList}
        <NewToolItem newItem={this.props.createToolItem} />
      </div>
    );
  }
}
ToolsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, quantity: PropTypes.string })
  ),
  createToolItem: PropTypes.func,
  deleteToolItemAtIdx: PropTypes.func
};
export default ToolsList;
