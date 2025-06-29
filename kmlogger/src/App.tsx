import { useEffect } from "react";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./shared/contexts/SnackbarContext";
import { AuthProvider } from "./shared/hooks/useAuthContext.hook";
import { autoRefresh } from "./shared/interceptors/auto-refresh.interceptor";
import ReactQueryProvider from "./plugins/react-query/react-query-provider.plugin";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { customTableTheme } from "./styles/overrides/table-styles";

export function App() {
  useEffect(() => {
    autoRefresh.startPeriodicCheck();
  }, []);

  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <ThemeProvider theme={customTableTheme}>
          <CssBaseline />
          
          <SnackbarProvider>
            <AuthProvider>
              <GlobalStyle />
              <Router />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}