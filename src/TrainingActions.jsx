import React from "react";
import { Grid, Button, withStyles } from "@material-ui/core";
import {
  PHASE_WORKOUT,
  PHASE_LAST_WORKOUT,
  PHASE_INITIAL,
  PHASE_REST
} from "./phases";

const styles = theme => ({
  fullWidth: {
    width: "100%"
  }
});

const WideButton = withStyles(styles)(props => (
  <Button {...props} className={props.classes.fullWidth} />
));

const InitialActions = ({ onStart }) => (
  <WideButton
    variant="contained"
    size="large"
    color="primary"
    onClick={onStart}
  >
    START
  </WideButton>
);

const RestActions = props => <WorkoutActions {...props} />;

const WorkoutActions = ({ onReset, onAdvance }) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <WideButton
        variant="contained"
        size="large"
        color="primary"
        onClick={onAdvance}
      >
        ADVANCE
      </WideButton>
    </Grid>
    <Grid item xs={12} sm={6}>
      <WideButton
        variant="contained"
        size="large"
        color="secondary"
        onClick={onReset}
      >
        RESET
      </WideButton>
    </Grid>
  </Grid>
);

const LastWorkoutActions = ({ onSuccess, onFailure }) => (
  <Grid container>
    <Grid item xs={12} sm={6}>
      <WideButton
        variant="contained"
        size="large"
        color="primary"
        onClick={onSuccess}
      >
        SUCCESS
      </WideButton>
    </Grid>
    <Grid item xs={12} sm={6}>
      <WideButton
        variant="contained"
        size="large"
        color="secondary"
        onClick={onFailure}
      >
        FAILURE
      </WideButton>
    </Grid>
  </Grid>
);

const TrainingActions = ({
  phase,
  onSuccess,
  onFailure,
  onReset,
  onAdvance,
  onStart
}) => {
  switch (phase) {
    case PHASE_REST:
      return <RestActions onAdvance={onAdvance} onReset={onReset} />;
    case PHASE_WORKOUT:
      return <WorkoutActions onAdvance={onAdvance} onReset={onReset} />;
    case PHASE_LAST_WORKOUT:
      return <LastWorkoutActions onSuccess={onSuccess} onFailure={onFailure} />;
    case PHASE_INITIAL:
      return <InitialActions onStart={onStart} />;
    default:
      return null;
  }
};

export default TrainingActions;
