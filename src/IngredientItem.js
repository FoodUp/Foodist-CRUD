import { PropTypes } from "prop-types";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const IngredientItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <ListItem>
      <ListItemText primary={`${item.name} - ${item.amount} ${item.unit}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Clear" onClick={handleDeleteItem}>
          <Icon>clear_icon</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
