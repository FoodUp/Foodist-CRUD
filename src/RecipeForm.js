import React from "react";
import IngredientsList from "./IngredientsList";
import ToolsList from "./ToolsList";
import { WithContext as ReactTags } from "react-tag-input";
import MyTextField from "./TextField";
import StepsList from "./StepsList";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import ImageUploader from "./ImageUploader";

const KeyCodes = {
  comma: 188,
  enter: 13
};
const timeUnit = ["min", "hour"];
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class RecipeForm extends React.Component {
  state = {
    name: "",
    description: "",
    person: "",
    time: { amount: 0, unit: "min" },
    type: "",
    tags: [],
    suggestions: [
      { id: "1", text: "vegan" },
      { id: "2", text: "fast" },
      { id: "3", text: "fastfood" }
    ],
    tools: [],
    uploadedImage: "",
    imagePreviewUrl: "",
    ingredients: [],
    steps: []
  };
  handleFieldChange = name => e => {
    this.setState({ [name]: e.target.value });
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
  handleSubmit = () => {
    // TODO: form validation, post form
  };
  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };
  handleAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };
  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  };
  render() {
    return (
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
          onChange={this.handleFieldChange("name")}
        />
        <MyTextField
          required
          label="Description"
          value={this.state.description}
          onChange={this.handleFieldChange("description")}
          multiline={true}
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

        <MyTextField
          label="Type"
          value={this.state.type}
          onChange={this.handleFieldChange("type")}
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
            required
            label="Time unit"
            select
            value={this.state.time.unit}
            onChange={this.handleTimeChange("unit")}
          >
            {timeUnit.map(option => (
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
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            delimiters={delimiters}
          />
        </label>

        <ImageUploader />
        <br />

        <FormLabel>
          Tools
          <ToolsList
            items={this.state.tools}
            createToolItem={this.createToolItem}
            deleteToolItemAtIdx={this.deleteToolItemAtIdx}
          />
        </FormLabel>
        <MyTextField
          label="Color"
          value={this.state.time.color}
          onChange={this.handleFieldChange("color")}
        />

        <IngredientsList
          items={this.state.ingredients}
          createIngredientItem={this.createIngredientItem}
          deleteIngredientItemAtIdx={this.deleteIngredientItemAtIdx}
        />
        <StepsList
          items={this.state.steps}
          createStepItem={this.createStepItem}
          deleteStepItemAtIdx={this.deleteStepItemAtIdx}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default RecipeForm;
