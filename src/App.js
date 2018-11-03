import React from "react";
import ReactDOM from "react-dom";
import RecipeForm from "./RecipeForm";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>Hello foodist CRUD </header>
        <RecipeForm />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
