import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

const SetsStepper = ({ currentSet, sets, children }) => (
  <Stepper activeStep={currentSet} orientation="vertical">
    {sets.map((pushupsCount, index) => (
      <Step key={index}>
        <StepLabel>
          {pushupsCount}
          {index === sets.length - 1 && "+"} pushups
        </StepLabel>
        <StepContent>{children}</StepContent>
      </Step>
    ))}
  </Stepper>
);

export default SetsStepper;
