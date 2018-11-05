import { PropTypes } from "prop-types";
import React from "react";
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
export default IngredientItem;
