import { PropTypes } from "prop-types";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const ToolItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <ListItem>
      <ListItemText primary={`${item.name} - ${item.quantity}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Clear" onClick={handleDeleteItem}>
          <Icon>clear_icon</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
