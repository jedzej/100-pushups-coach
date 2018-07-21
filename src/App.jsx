import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import TrainingSelector from "./TrainingSelector";
import Training from "./Training";

class App extends Component {
  state = {
    level: localStorage.getItem("level") || "",
    day: localStorage.getItem("day") || ""
  };

  handleSelectorChange = (level, day) => {
    localStorage.setItem("level", level);
    localStorage.setItem("day", day);
    this.setState({ level, day });
  };

  handleSuccess = () => {
    const { day } = this.state;
    this.setState({
      day: (Number(day) + 1).toString()
    });
    console.log("success");
  };

  handleFailure = () => {
    console.log("failure");
  };

  render() {
    const { level, day } = this.state;

    return (
      <Grid container>
        <Grid item xs={12}>
          <TrainingSelector
            onChange={this.handleSelectorChange}
            level={level}
            day={day}
          />
        </Grid>
        <Grid item xs={12}>
          {level &&
            day && (
              <Training
                level={level}
                day={day}
                onSuccess={this.handleSuccess}
                onFailure={this.handleFailure}
              />
            )}
        </Grid>
      </Grid>
    );
  }
}

export default App;
