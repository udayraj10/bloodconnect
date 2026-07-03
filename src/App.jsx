import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom"
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors"
import AppRoutes from "./routes/AppRoutes"

function App() {
  useAxiosInterceptors()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
