import React from "react";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { StepLabel, Stepper, Typography, Step } from "@material-ui/core";
import "./CheckoutStep.css";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyle = {
    boxSizing: "border-box",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            {" "}
            <StepLabel
              style={{
                color: activeStep >= index ? "green" : "blue",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default CheckoutSteps;
