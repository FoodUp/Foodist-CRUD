import { PropTypes } from "prop-types";
import React from "react";
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
export default ToolItem;
