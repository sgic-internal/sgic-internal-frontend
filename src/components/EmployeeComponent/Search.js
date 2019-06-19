import React, { Component } from "react";
import { Table, Input, Icon } from "antd";

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: "Search Employee",
      currentText: " "
    };
  }

  changeText(currentText) {
    this.setState({ currentText });
    //console.log({currentText});
  }

  render() {
    return (
      <div>
        <div class="search-box">
          <form>
            <input
              type="text"
              placeholder={this.state.initialState}
              onChange={this.changeText.bind(this, "currentText")}
            />
            <button onClick={this.changeText.bind(this, "currentText")}>
              <Icon type="search" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}
