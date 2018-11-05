import { PropTypes } from "prop-types";
import React from "react";
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

export default StepItem;
