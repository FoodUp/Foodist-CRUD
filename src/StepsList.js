import React from "react";
import { PropTypes } from "prop-types";
import NewStepItem from "./NewStepItem";
import StepItem from "./StepItem";
import List from "@material-ui/core/List";
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
        <List>{itemsList}</List>
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
