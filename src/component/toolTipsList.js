import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";

const TooltipItem = props => {
  const { item, id } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <React.Fragment>
      <Button className="mr-1" color="secondary" id={"Tooltip-" + id}>
        {item.text}
      </Button>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        Tooltip Content!
      </Tooltip>
    </React.Fragment>
  );
};