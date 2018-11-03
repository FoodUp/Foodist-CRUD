import React from "react";
import { PropTypes } from "prop-types";
import Button from "@material-ui/core/Button";
import MyTextField from "./TextField";
const StepItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <div>
      <p>
        Step {id + 1}: {item.text}
        <button onClick={handleDeleteItem}>x</button>
      </p>
    </div>
  );
};
StepItem.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired
  }),
  id: PropTypes.number,
  deleteItem: PropTypes.func
};

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
      <div>
        <MyTextField
          label="Step"
          value={this.state.step}
          onChange={this.onChange}
          multiline={true}
        />
        <Button onClick={this.onSubmit} variant="contained" color="primary">
          submit
        </Button>
      </div>
    );
  }
}
NewStepItem.propTypes = {
  newItem: PropTypes.func
};

class StepsList extends React.Component {
  render() {
    const itemsList = this.props.items.map((item, idx) => {
      return (
        <StepItem
          key={idx}
          id={idx}
          item={item}
          deleteItem={this.props.deleteStepItemAtIdx}
        />
      );
    });
    return (
      <div>
        {itemsList}
        <NewStepItem newItem={this.props.createStepItem} />
      </div>
    );
  }
}
StepsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, image: PropTypes.string })
  ).isRequired,
  createStepItem: PropTypes.func.isRequired,
  deleteStepItemAtIdx: PropTypes.func.isRequired
};
export default StepsList;
