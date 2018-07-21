import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";

import TrainingStepper from "./TrainingStepper";
import TrainingSelector from "./TrainingSelector";

import { playClicks, stopClicks, playPing } from "./sounds";
import trainings from "./trainings";

const getTrainingDay = (range, day) => {
  const trainingRange = trainings.find(training => training.range === range);
  return trainingRange && typeof day === "number" && trainingRange.plan[day];
};

class App extends Component {
  state = {
    range: null,
    day: null,
    activeSerie: 0,
    phase: "workout",
    countdownValue: 0,
    countdownInterval: null
  };

  handleCountdownInterval = () => {
    const { countdownValue } = this.state;
    this.setState({ countdownValue: countdownValue - 1 });
    if (countdownValue <= 0) {
      this.handleAdvance();
    }
  };

  startCountdown(value) {
    this.setState({
      countdownValue: value,
      countdownInterval: setInterval(this.handleCountdownInterval, 100)
    });
  }

  startWorkout(value) {
    this.setState({
      workoutInterval: setInterval(this.handleWorkoutInterval, 2000)
    });
  }

  handleSelectorChange = (range, day) => {
    this.setState({ range, day });
  };

  handleAdvance = () => {
    const { phase, activeSerie, range, day, countdownInterval } = this.state;
    let state = {};
    if (countdownInterval) {
      clearInterval(this.state.countdownInterval);
      state = {
        ...state,
        countdownInterval: null
      };
    }
    switch (phase) {
      case "workout":
        this.startCountdown(getTrainingDay(range, day).interval);
        stopClicks();
        state = {
          ...state,
          phase: "wait"
        };
        break;
      case "wait":
        playPing();
        playClicks(3000);
        state = {
          ...state,
          phase: "workout",
          activeSerie: activeSerie + 1
        };
        break;
      default:
        break;
    }
    this.setState(state);
  };

  render() {
    const { activeSerie, range, day, phase, countdownValue } = this.state;
    const trainingDay = getTrainingDay(range, day);

    return (
      <Grid container>
        <Grid item xs={12}>
          <TrainingSelector
            trainings={trainings}
            onChange={this.handleSelectorChange}
          />
        </Grid>
        <Grid item>
          {trainingDay && (
            <TrainingStepper
              activeSerie={activeSerie}
              series={trainingDay.series}
            >
              {phase === "wait" && <div>{countdownValue}</div>}
              <div>{phase}</div>
            </TrainingStepper>
          )}
        </Grid>
        <Grid item>
          <Button onClick={this.handleAdvance}>NEXT</Button>
        </Grid>
      </Grid>
    );
  }
}

export default App;
