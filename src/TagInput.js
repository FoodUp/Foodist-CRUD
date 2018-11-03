import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
const mapWithIdx = fp.map.convert({ cap: false });

export class TagInput extends React.Component {
  tagsListRenderer = mapWithIdx((t, idx) => (
    <Tag key={idx} value={t} handleClick={() => this.props.removeTagAt(idx)} />
  ));
  input = React.createRef();
  handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      let val = e.target.value;
      val = val.trim();
      if (val === "") {
        return;
      } else {
        this.props.addTag(val);
        e.target.value = "";
      }
    }
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };
  render() {
    return (
      <div>
        {this.tagsListRenderer(this.props.tags)}
        <input onKeyPress={this.handleKeyPress} type="text" ref={this.input} />
      </div>
    );
  }
}

class Tag extends React.Component {
  render() {
    const styles = { display: "inline-block", marginRight: 4 };
    return (
      <div style={styles} onClick={this.props.handleClick}>
        <span>{this.props.value}</span>
      </div>
    );
  }
}

Tag.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  addTag: PropTypes.func,
  removeTagAt: PropTypes.func
};
