import{ GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./shared/contexts/SnackbarContext";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <GlobalStyle />
        <Router />
      </SnackbarProvider>
    </BrowserRouter>
  );
}