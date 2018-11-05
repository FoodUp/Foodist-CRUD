import { PropTypes } from "prop-types";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
const StepItem = ({ id, item, deleteItem }) => {
  const handleDeleteItem = e => {
    e.preventDefault();
    deleteItem(id);
  };
  return (
    <ListItem>
      <ListItemText primary={item.text} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Clear" onClick={handleDeleteItem}>
          <Icon>clear_icon</Icon>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
