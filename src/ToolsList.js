import React from "react";
import { PropTypes } from "prop-types";
import NewToolItem from "./NewToolItem";
import ToolItem from "./ToolItem";
import List from "@material-ui/core/List";

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
        <List>{itemsList}</List>
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
