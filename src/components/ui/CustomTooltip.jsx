import Tooltip from "@mui/material/Tooltip"

const CustomTooltip = ({ children, title, disable }) => {
  return (
    <Tooltip
      describeChild
      title={title}
      disableFocusListener={disable}
      disableTouchListener={disable}
      disableHoverListener={disable}
    >
      <span>{children}</span>
    </Tooltip>
  )
}

export default CustomTooltip
