import React from "react";
import ReactDOM from "react-dom";
import RecipeForm from "./RecipeForm";

class App extends React.Component {
  //TODO: react router : newRecipe, showAllRecipe, editOneRecipe
  render() {
    return (
      <div>
        <RecipeForm />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
