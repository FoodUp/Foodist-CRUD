import React from "react";
import { PropTypes } from "prop-types";
import NewIngredientItem from "./NewIngredientItem";
import IngredientItem from "./IngredientItem";

class IngredientsList extends React.Component {
  render() {
    const itemsList = this.props.items.map((item, idx) => {
      return (
        <IngredientItem
          key={idx}
          id={idx}
          item={item}
          deleteItem={this.props.deleteIngredientItemAtIdx}
        />
      );
    });
    return (
      <div>
        {itemsList}
        <NewIngredientItem newItem={this.props.createIngredientItem} />
      </div>
    );
  }
}
IngredientsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, amount: PropTypes.string })
  ).isRequired,
  createIngredientItem: PropTypes.func.isRequired,
  deleteIngredientItemAtIdx: PropTypes.func.isRequired
};
export default IngredientsList;
