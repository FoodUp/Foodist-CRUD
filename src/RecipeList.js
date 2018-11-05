import React from "react";
import config from "./config";

class RecipeList extends React.Component {
  state = {
    recipes: []
  };
  componentDidMount() {
    fetch(config.API_URL + "/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.text();
        }
      })
      .then(response => {
        console.log(response);
        // this.setState({ recipes: res });
      })
      .catch(err => console.log(err));
  }
  render() {
    // TODO: render all recipes: basic info
    // TODO: active, remove, edit recipe
    return <h2>RecipeList</h2>;
  }
}

export default RecipeList;
