import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.page";
import SignInPage from "./pages/Sign-in.page";
import RegisterPage from "./pages/Register.page";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
