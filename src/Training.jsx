import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import SetsStepper from "./SetsStepper";
import TrainingActions from "./TrainingActions";

import { playClicks, stopClicks, playPing } from "./sounds";
import { getTraining } from "./trainings";
import {
  PHASE_INITIAL,
  PHASE_WORKOUT,
  PHASE_REST,
  PHASE_LAST_WORKOUT
} from "./phases";

class Training extends Component {
  state = {
    currentSet: 0,
    phase: PHASE_INITIAL,
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

  handleSuccess = () => {
    this.setState({
      currentSet: 0,
      phase: PHASE_INITIAL
    });
    stopClicks();
    this.props.onSuccess();
  };

  handleFailure = () => {
    this.setState({
      currentSet: 0,
      phase: PHASE_INITIAL
    });
    stopClicks();
    this.props.onFailure();
  };

  handleReset = () => {
    this.setState({
      currentSet: 0,
      phase: PHASE_INITIAL
    });
    stopClicks();
  };
  
  componentWillUnmount() {
    stopClicks();
  }

  handleAdvance = () => {
    const { phase, currentSet, countdownInterval } = this.state;
    const { day, level } = this.props;
    const training = getTraining(level, day);
    let state = {};
    if (countdownInterval) {
      clearInterval(this.state.countdownInterval);
      state = {
        ...state,
        countdownInterval: null
      };
    }
    switch (phase) {
      case PHASE_INITIAL:
        state = {
          ...state,
          phase: PHASE_REST
        };
        break;
      case PHASE_WORKOUT:
        this.startCountdown(training.interval);
        stopClicks();
        state = {
          ...state,
          phase: PHASE_REST
        };
        break;
      case PHASE_REST:
        playPing();
        playClicks(3000);
        state = {
          ...state,
          phase:
            currentSet === training.sets.length - 2
              ? PHASE_LAST_WORKOUT
              : PHASE_WORKOUT,
          currentSet: currentSet + 1
        };
        break;
      default:
        break;
    }
    this.setState(state);
  };

  render() {
    const { currentSet, phase, countdownValue } = this.state;
    const { level, day } = this.props;
    const training = getTraining(level, day);

    return (
      <Grid container>
        <Grid item sm={6} xs={12}>
          {training && (
            <SetsStepper currentSet={currentSet} sets={training.sets}>
              {phase === PHASE_REST && <div>{countdownValue}</div>}
              <div>{phase}</div>
            </SetsStepper>
          )}
        </Grid>
        <Grid item sm={6} xs={12}>
          <TrainingActions
            phase={phase}
            onSuccess={this.handleSuccess}
            onFailure={this.handleFailure}
            onReset={this.handleReset}
            onAdvance={this.handleAdvance}
            onStart={this.handleAdvance}
          />
        </Grid>
      </Grid>
    );
  }
}

export default Training;
