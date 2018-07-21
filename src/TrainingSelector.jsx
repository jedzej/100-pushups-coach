import React, { Component } from "react";
import { Select, MenuItem, Grid } from "@material-ui/core";

class TrainingSelector extends Component {
  state = { range: "", day: "" };

  populateChange(range, day) {
    this.setState({ range, day }, () => {
      this.props.onChange(range, day);
    });
  }

  handleDayChange = event => {
    console.log("handleDayChange: ", event.target.value);
    this.populateChange(this.state.range, event.target.value);
  };

  handleRangeChange = event => {
    console.log("handleRangeChange: ", event.target.value);
    this.populateChange(event.target.value, "");
  };

  render() {
    const { trainings } = this.props;
    const { range, day } = this.state;
    const plan =
      range && trainings.find(training => training.range === range).plan;
    return (
      <Grid container>
        <Grid item>
          <Select value={range} onChange={this.handleRangeChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {trainings.map(training => (
              <MenuItem value={training.range} key={training.range}>
                {training.range}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          {plan && (
            <Select value={day} onChange={this.handleDayChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {plan.map((_, index) => (
                <MenuItem value={index} key={index}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default TrainingSelector;
