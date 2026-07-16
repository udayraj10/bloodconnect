import { styled } from "@mui/material/styles"

const ChipRoot = styled("span")(({ theme, variant, size }) => ({
  display: "inline-flex",
  alignItems: "center",
  borderWidth: "2px",
  borderStyle: "solid",
  borderRadius: "4px",
  fontWeight: 600,
  padding: "3px 6px",
  fontSize: "0.85rem",
  lineHeight: 1,
  textTransform: "uppercase",

  ...(variant === "success" && {
    backgroundColor: "#E6F4EA",
    borderColor: "#CEEAD6",
    color: "#137333",
  }),

  ...(variant === "error" && {
    backgroundColor: "#FCE8E6",
    borderColor: "#FAD2CF",
    color: "#C5221F",
  }),

  ...(variant === "warning" && {
    backgroundColor: "#FEF7E0",
    borderColor: "#FEEFC3",
    color: "#B06000",
  }),

  ...(variant === "info" && {
    backgroundColor: "#E8F0FE",
    borderColor: "#D2E3FC",
    color: "#1A73E8",
  }),

  ...(variant === "purple" && {
    backgroundColor: "#F3E8FF",
    borderColor: "#E9D5FF",
    color: "#7E22CE",
  }),

  ...(variant === "cyan" && {
    backgroundColor: "#E0F7FA",
    borderColor: "#B2EBF2",
    color: "#007A87",
  }),
}))

const Chip = ({ children, variant = "error" }) => {
  return <ChipRoot variant={variant}>{children}</ChipRoot>
}

export default Chip
