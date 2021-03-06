import "babel-polyfill";
import React from "react";
import config from "./config";

import Container from "./Container";
import IngredientsList from "./IngredientsList";
import ToolsList from "./ToolsList";

import { WithContext as ReactTags } from "react-tag-input";
import MyTextField from "./TextField";
import StepsList from "./StepsList";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import ImageUploader from "./ImageUploader";
import Button from "@material-ui/core/Button";

const KeyCodes = {
  comma: 188,
  enter: 13
};
const timeUnit = { min: "min", hour: "hour" };
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const suggestions = [
  { id: "1", text: "vegan" },
  { id: "2", text: "fast" },
  { id: "3", text: "fastfood" }
];

class RecipeForm extends React.Component {
  state = {
    name: "",
    description: "",
    person: "",
    time: { amount: 0, unit: timeUnit.min },
    type: "",
    tags: [],
    tools: [],
    image: null,
    ingredients: [],
    steps: []
  };
  handleFieldChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  handleImageChange = file => {
    this.setState({ image: file });
  };
  handleTimeChange = key => e => {
    const timeObj = Object.assign(this.state.time, { [key]: e.target.value });
    this.setState({ time: timeObj });
  };
  createToolItem = (n, q) => {
    this.setState({
      tools: [...this.state.tools, { name: n, quantity: q }]
    });
  };
  deleteToolItemAtIdx = idx => {
    const newTool = [
      ...this.state.tools.slice(0, idx),
      ...this.state.tools.slice(idx + 1)
    ];
    this.setState({ tools: newTool });
  };
  createIngredientItem = (n, a, u) => {
    this.setState({
      ingredients: [...this.state.ingredients, { name: n, amount: a, unit: u }]
    });
  };
  deleteIngredientItemAtIdx = idx => {
    const newIngredient = [
      ...this.state.ingredients.slice(0, idx),
      ...this.state.ingredients.slice(idx + 1)
    ];
    this.setState({ ingredients: newIngredient });
  };
  createStepItem = (step, image = "") => {
    const steps = [...this.state.steps, { text: step, image: image }];
    this.setState({ steps: steps });
  };
  deleteStepItemAtIdx = idx => {
    const newSteps = [
      ...this.state.steps.slice(0, idx),
      ...this.state.steps.slice(idx + 1)
    ];
    this.setState({ steps: newSteps });
  };
  handleTagDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };
  handleTagAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };
  handleTagDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  };
  getJsonData = () => {
    const transFormedData = Object.assign({}, this.state, {
      time: this.transformTime(),
      tags: this.transformTag()
    });
    delete transFormedData.image;
    return transFormedData;
  };
  getFormData = () => {
    const formData = new FormData();
    formData.append("image", this.state.image);
    return formData;
  };
  handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(config.API_URL + "/recipes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        },
        body: JSON.stringify(this.getJsonData())
      }).then(async res => {
        if (res.ok) {
          return res.json();
        } else {
          const errMsg = await res.text();
          alert(errMsg);
        }
      });
      if (res) {
        if (this.state.image) {
          await fetch(`${config.API_URL}/recipes/${res._id}/image`, {
            method: "POST",
            body: this.getFormData()
          })
            .then(res => res.json())
            .then(response => {
              console.log(JSON.stringify(response));
            });
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  transformTag() {
    let tagArr = [...this.state.tags];
    tagArr = tagArr.map(ele => ele.text);
    return tagArr;
  }
  transformTime() {
    let timeObj = Object.assign({}, this.state.time);
    timeObj =
      timeObj.unit === timeUnit.hour
        ? { amount: timeObj.amount * 60, unit: timeUnit.min }
        : timeObj;
    return timeObj;
  }

  render() {
    return (
      <Container>
        <form
          action=""
          onSubmit={this.handleSubmit}
          noValidate
          autoComplete="off"
        >
          <MyTextField
            required
            label="Name"
            value={this.state.name}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            onChange={this.handleFieldChange("name")}
          />
          <MyTextField
            required
            label="Description"
            value={this.state.description}
            InputLabelProps={{
              shrink: true
            }}
            onChange={this.handleFieldChange("description")}
            multiline={true}
            fullWidth
          />
          <MyTextField
            required
            label="Color"
            value={this.state.color}
            onChange={this.handleFieldChange("color")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <MyTextField
            label="Type"
            value={this.state.type}
            onChange={this.handleFieldChange("type")}
            InputLabelProps={{
              shrink: true
            }}
          />
          <MyTextField
            type="number"
            label="Numbers of Person"
            value={this.state.person}
            onChange={this.handleFieldChange("person")}
            InputLabelProps={{
              shrink: true
            }}
          />

          <FormGroup row={true}>
            <MyTextField
              required
              type="number"
              label="Time amount"
              value={this.state.time.amount}
              onChange={this.handleTimeChange("amount")}
            />
            <MyTextField
              label="Time unit"
              select
              value={this.state.time.unit}
              onChange={this.handleTimeChange("unit")}
            >
              {Object.values(timeUnit).map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </MyTextField>
          </FormGroup>

          <label htmlFor="tag">
            tag:{" "}
            <ReactTags
              autocomplete={1}
              tags={this.state.tags}
              suggestions={suggestions}
              handleDelete={this.handleTagDelete}
              handleAddition={this.handleTagAddition}
              handleDrag={this.handleTagDrag}
              delimiters={delimiters}
            />
          </label>
          <FormLabel>
            Recipe Cover Image
            <ImageUploader handleImageChange={this.handleImageChange} />
          </FormLabel>
          <br />
          <FormLabel>Tools</FormLabel>
          <ToolsList
            items={this.state.tools}
            createToolItem={this.createToolItem}
            deleteToolItemAtIdx={this.deleteToolItemAtIdx}
          />
          <br />
          <FormLabel>Ingredients</FormLabel>
          <IngredientsList
            items={this.state.ingredients}
            createIngredientItem={this.createIngredientItem}
            deleteIngredientItemAtIdx={this.deleteIngredientItemAtIdx}
          />
          <br />
          <FormLabel>Steps</FormLabel>
          <StepsList
            items={this.state.steps}
            createStepItem={this.createStepItem}
            deleteStepItemAtIdx={this.deleteStepItemAtIdx}
          />
          <br />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
    );
  }
}

export default RecipeForm;
