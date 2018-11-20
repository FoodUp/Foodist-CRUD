import React from "react";
import config from "./config";

import Container from "./Container";
import IngredientsList from "./IngredientsList";
import ToolsList from "./ToolsList";

import MyTextField from "./TextField";
import StepsList from "./StepsList";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import ImageUploader from "./ImageUploader";

const timeUnit = { min: "min", hour: "hour" };

class RecipeEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      id: props.match.params.id,
      image: ""
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
        this.setState({ recipe: response });
        console.log(this.state.recipe);
      })
      .catch(err => console.log(err));
  }

  handleImageChange = file => {
    this.setState({ image: file });
  };
  getFormData = () => {
    const formData = new FormData();
    formData.append("image", this.state.image);
    return formData;
  };
  handleSubmit = async e => {
    e.preventDefault();
    // try {
    //   const res = await fetch(config.API_URL + "/recipes", {
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //       accept: "application/json"
    //     },
    //     body: JSON.stringify(this.getJsonData())
    //   }).then(async res => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       const errMsg = await res.text();
    //       alert(errMsg);
    //     }
    //   });
    //   if (res) {
    //     if (this.state.image) {
    //       await fetch(`${config.API_URL}/recipes/${res._id}/image`, {
    //         method: "POST",
    //         body: this.getFormData()
    //       })
    //         .then(res => res.json())
    //         .then(response => {
    //           console.log(JSON.stringify(response));
    //         });
    //     }
    //   }
    // } catch (e) {
    //   console.log("error", e);
    // }
  };
  submitImage = async e => {
    e.preventDefault();
    if (typeof this.state.recipe._id !== "undefined") {
      await fetch(`${config.API_URL}/recipes/${this.state.recipe._id}/image`, {
        method: "POST",
        body: this.getFormData()
      })
        .then(res => res.json())
        .then(response => {
          console.log(JSON.stringify(response));
        });
    }
  };
  renderForm = () => {
    const {
      name,
      description,
      color,
      type,
      person,
      time,
      tools,
      ingredients,
      steps,
      tags
    } = this.state.recipe;
    return (
      <form action="" noValidate autoComplete="off">
        <MyTextField
          required
          label="Name"
          value={name}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />
        <MyTextField
          required
          label="Description"
          value={description}
          InputLabelProps={{
            shrink: true
          }}
          multiline={true}
          fullWidth
        />
        <MyTextField
          required
          label="Color"
          value={color}
          InputLabelProps={{
            shrink: true
          }}
        />
        <MyTextField
          label="Type"
          value={type}
          InputLabelProps={{
            shrink: true
          }}
        />
        <MyTextField
          type="number"
          label="Numbers of Person"
          value={person}
          InputLabelProps={{
            shrink: true
          }}
        />

        <FormGroup row={true}>
          <MyTextField
            required
            type="number"
            label="Time amount"
            value={time.amount}
          />
          <MyTextField label="Time unit" select value={time.unit}>
            {Object.values(timeUnit).map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </MyTextField>
        </FormGroup>

        <div>tag: </div>
        {tags.map(tag => (
          <span key={tag}>{tag} </span>
        ))}
        <br />
        <FormLabel>
          Recipe Cover Image
          <ImageUploader handleImageChange={this.handleImageChange} />
          <button onClick={this.submitImage}>Comfirm Image</button>
        </FormLabel>
        <br />
        <FormLabel>Tools</FormLabel>
        {tools.map((tool, i) => (
          <div key={i}>
            <span>{tool.name}</span>
            <span>{tool.quantity}</span>
          </div>
        ))}
        <br />
        <FormLabel>Ingredients</FormLabel>
        {ingredients.map((ingredient, i) => (
          <div key={i}>
            <span>{ingredient.name}</span>
            <span>{ingredient.amount}</span>
            <span>{ingredient.unit}</span>
          </div>
        ))}
        <br />
        <FormLabel>Steps</FormLabel>
        {steps.map((step, i) => (
          <div key={i}>
            <span>{step.text}</span>
          </div>
        ))}
        <br />
      </form>
    );
  };
  // TODO: render recipe detail
  // TODO: submit edidtion
  // TODO: delete recipe
  render() {
    return (
      <div>
        <Container>
          <h2>RecipeEditForm: {this.props.match.params.id}</h2>
          {typeof this.state.recipe._id === "undefined" ? (
            <div>Loading</div>
          ) : (
            this.renderForm()
          )}
        </Container>
      </div>
    );
  }
}

export default RecipeEditForm;
