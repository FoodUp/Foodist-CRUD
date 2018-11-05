import React from "react";
import ReactDOM from "react-dom";
import RecipeForm from "./RecipeForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RecipeEditForm from "./RecipeEditForm";
import RecipeList from "./RecipeList";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <Route path="/edit/:id" component={RecipeEditForm} />
          <Route path="/new" component={RecipeForm} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
