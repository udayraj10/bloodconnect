import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom"
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors"
import Progress from "./components/ui/Progress"
import AppRoutes from "./routes/AppRoutes"

function App() {
  const isInterceptorReady = useAxiosInterceptors()

  if (!isInterceptorReady) {
    return <Progress />
  }

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
