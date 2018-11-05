import React from "react";
import config from "./config";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import Container from "./Container";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";

const style = {
  listItemText: {
    width: "calc(100% - 120px)"
  }
};
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
  handleToggle = idx => e => {
    const checked = e.target.checkeded;
    const newRecipes = [...this.state.recipes];
    if (newRecipes[idx].online !== checked) {
      newRecipes[idx].online = !newRecipes[idx].online;
      this.setState({ recipes: newRecipes });
      //TODO: call api to update online
    }
  };
  render() {
    // TODO: render all recipes: basic info
    // TODO: active, remove, edit recipe
    return (
      <Container>
        <Typography variant="h5">All Recipes</Typography>
        <List dense>
          {this.state.recipes.map((obj, idx) => (
            <ListItem key={obj._id} className={this.props.classes.listItemText}>
              <Avatar
                alt={obj.name}
                src={`${config.API_URL}/recipe/image/${obj.image}`}
              />
              <ListItemText primary={obj.name} secondary={obj.description} />
              <ListItemSecondaryAction>
                <Switch
                  color="primary"
                  onChange={this.handleToggle(idx)}
                  checked={obj.online}
                />
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

export default withStyles(style)(RecipeList);
