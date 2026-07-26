import Paper from "@mui/material/Paper"
import { PieChart, pieClasses } from "@mui/x-charts/PieChart"
import Typography from "@mui/material/Typography"

const Piechart = ({ data, title }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        backgroundColor: "#fff",
        borderRadius: 1,
        px: 2,
        py: 1.5,
        flexGrow: 1,
      }}
    >
      <Typography
        variant="body1"
        component="h1"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        {title}
      </Typography>

      <PieChart
        series={[{ innerRadius: 0, outerRadius: 80, data, arcLabel: "value" }]}
        width={180}
        height={180}
        sx={{
          [`& .${pieClasses.arcLabel}`]: {
            fill: "white",
          },
        }}
      />
    </Paper>
  )
}

export default Piechart
