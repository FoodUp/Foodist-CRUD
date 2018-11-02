import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header>Hello foodist CRUD</header>
        <h2>world</h2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
