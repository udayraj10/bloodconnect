import Grid from "@mui/material/Grid"
import StatItem from "./StatItem"

const StatGrid = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid key={item.key} size={{ xs: 6, sm: 4, lg: 3 }}>
          <StatItem
            label={item.label}
            value={item.value}
            description={item.description}
            icon={item.icon}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default StatGrid
