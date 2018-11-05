import React from "react";
import config from "./config";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Container from "./Container";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

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
        this.setState({ recipes: response });
      })
      .catch(err => console.log(err));
  }
  render() {
    // TODO: render all recipes: basic info
    // TODO: active, remove, edit recipe
    return (
      <Container>
        <Typography variant="h5">All Recipes</Typography>
        <List>
          {this.state.recipes.map(obj => (
            <ListItem key={obj._id} button>
              <Avatar
                alt={obj.name}
                src={`${config.API_URL}/recipe/image/${obj.image}`}
              />
              <ListItemText primary={obj.name} secondary={obj.description} />
              <ListItemSecondaryAction>
                <Link to={`/edit/${obj._id}`}>
                  <IconButton aria-label="Edit">
                    <Icon>edit_icon</Icon>
                  </IconButton>
                </Link>
                <IconButton color="secondary" aria-label="Delete">
                  <Icon>delete_icon</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

export default RecipeList;
