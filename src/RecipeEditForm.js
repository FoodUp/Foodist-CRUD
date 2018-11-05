import React from "react";
import config from "./config";

class RecipeEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      id: props.match.params.id
    };
  }
  componentDidMount() {
    fetch(`${config.API_URL}/recipes/${this.state.id}`, {
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
        this.setState({ recipe: response });
      })
      .catch(err => console.log(err));
  }
  // TODO: render recipe detail
  // TODO: submit edidtion
  // TODO: delete recipe
  render() {
    return <h2>RecipeEditForm: {this.props.match.params.id}</h2>;
  }
}

export default RecipeEditForm;
