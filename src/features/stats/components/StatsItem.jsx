import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

const StatsItem = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item size={{ xs: 6, sm: 4, lg: 2.4 }} key={item.label}>
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
              {item.value}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: { xs: 15, sm: 16 } }}
            >
              {item.label}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {item.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsItem
