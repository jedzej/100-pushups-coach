import React, { Component } from "react";
import { Select, MenuItem, Grid } from "@material-ui/core";
import { getLevels, getPlan } from "./trainings";

class TrainingSelector extends Component {
  handleLevelChange = event => {
    this.props.onChange(event.target.value, "");
  };

  handleDayChange = event => {
    this.props.onChange(this.props.level, event.target.value);
  };

  render() {
    const { level, day } = this.props;
    const plan = getPlan(level);
    return (
      <Grid container>
        <Grid item sm={6} xs={12}>
          <Select value={level} onChange={this.handleLevelChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {getLevels().map(level => (
              <MenuItem value={level} key={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item sm={6} xs={12}>
          {plan && (
            <Select value={day.toString()} onChange={this.handleDayChange}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {plan.trainings.map((_, index) => (
                <MenuItem value={index.toString()} key={index}>
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
