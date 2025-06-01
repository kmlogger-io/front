import{ GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Router/>    
      </BrowserRouter>
      <GlobalStyle/>  
    </>
  )
}