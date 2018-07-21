import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

const TrainingStepper = ({ activeSerie, series, children }) => (
  <Stepper activeStep={activeSerie} orientation="vertical">
    {series.map((pushupsCount, index) => (
      <Step key={index}>
        <StepLabel>
          {pushupsCount}
          {index === series.length - 1 && "+"} pushups
        </StepLabel>
        <StepContent>
          {children}
        </StepContent>
      </Step>
    ))}
  </Stepper>
);

export default TrainingStepper;
