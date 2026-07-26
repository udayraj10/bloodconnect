import { useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Stack,
  Grid,
  Card,
  Box,
} from "@mui/material"
import {
  Search,
  Dashboard,
  Security,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material"
import BoltIcon from "@mui/icons-material/Bolt"
import Footer from "../components/layout/Footer"
import heroImage from "../assets/hero-image.webp"

const HomePage = () => {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate("/auth")
  }

  const navItems = [
    { label: "Home", targetId: "home" },
    { label: "About Us", targetId: "about" },
    { label: "Contact Us", targetId: "contact" },
  ]

  const handleScroll = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const stats = [
    { label: "Active Donors", value: "1,250+" },
    { label: "Successful Donations", value: "980+" },
    { label: "Hospitals Joined", value: "75+" },
  ]

  const features = [
    {
      title: "Real-time Matching",
      desc: "Connects donors based on blood group and location instantly.",
      icon: <Search color="error" />,
    },
    {
      title: "Secure & Reliable",
      desc: "Your data is safe with secure authentication and privacy.",
      icon: <Security color="error" />,
    },
    {
      title: "Quick Response",
      desc: "Create requests and get offers from nearby donors.",
      icon: <BoltIcon color="error" />,
    },
    {
      title: "Dashboard & Stats",
      desc: "Track donation history and request statuses effortlessly.",
      icon: <Dashboard color="error" />,
    },
  ]

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pb: 8 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                cursor: "pointer",
              }}
              onClick={() => handleScroll("home")}
            >
              BloodConnect
            </Typography>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleScroll(item.targetId)}
                    sx={{
                      color: "#333333",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={handleButtonClick}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Toolbar />

      <Box id="home" sx={{ pt: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 800, mb: 2 }}
              >
                Connect. Donate. <br />
                <Typography
                  component="span"
                  variant="h3"
                  color="error"
                  sx={{ fontWeight: 800 }}
                >
                  Save Lives.
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, fontSize: "1.1rem" }}
              >
                BloodConnect bridges the gap between donors and people in urgent
                need of blood. Find donors, make requests, and help save
                precious lives in your community.
              </Typography>
            </Grid>
            <Grid size={{ xs: 0, md: 6 }}>
              <Box
                sx={{
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={heroImage}
                  alt="Hero illustration"
                  sx={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {stats.map((stat, idx) => (
              <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                <Card
                  variant="outlined"
                  sx={{
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "primary.main" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        id="about"
        sx={{ py: 8, bgcolor: "#ffffff", borderTop: "1px solid #e0e0e0" }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "700", mb: 2 }}
          >
            About Us
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto", mb: 6 }}
          >
            BloodConnect is a real-time platform that minimizes delays during
            medical emergencies. We connect local blood donors directly with
            nearby patients in need. By matching blood types and geographic
            locations, we ensure patients receive the right blood quickly, while
            helping donors easily support their local community.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center", mb: 2 }}
                  >
                    {feature.icon}
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                      {feature.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box id="contact" sx={{ py: 8, borderTop: "1px solid #e0e0e0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "700", mb: 2 }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Have questions or need assistance? Reach out to our support team.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email color="error" />
              <Typography variant="body2">support@bloodconnect.org</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Phone color="error" />
              <Typography variant="body2">+1 (800) 123-4567</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn color="error" />
              <Typography variant="body2">
                202, Rashtriya Vidyalaya road, Basavanagudi, Bangalore, India
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default HomePage
