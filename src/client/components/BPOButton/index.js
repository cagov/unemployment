import Button from "react-bootstrap/Button";
import React from "react";
import { logEvent } from "../../utils.js";

function BPOButton() {
  return (
    <Button
      variant="secondary"
      href="https://www.edd.ca.gov/Benefit_Programs_Online.htm"
      onClick={() => logEvent("register-or-login")}
      target="_blank"
    >
      Go to Benefit Programs Online
    </Button>
  );
}

export default BPOButton;
