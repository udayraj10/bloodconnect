import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const StatItem = ({ label, value, description }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: 1,
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        fontWeight={700}
        sx={{ fontSize: { xs: 24, sm: 26 } }}
      >
        {value}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: 600, fontSize: { xs: 15, sm: 16 } }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        {description}
      </Typography>
    </Paper>
  )
}

export default StatItem
