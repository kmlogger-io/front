import { useEffect } from "react";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./shared/contexts/SnackbarContext";
import { AuthProvider } from "./shared/hooks/useAuthContext.hook";
import { autoRefresh } from "./shared/interceptors/auto-refresh.interceptor";

export function App() {
  useEffect(() => {
    autoRefresh.startPeriodicCheck();
  }, []);

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <GlobalStyle />
          <Router />
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}