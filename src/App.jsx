import React from "react";
import { Body } from "./pages/Body/Body";
import { Header } from "./common/Header/Header";
import { Footer } from "./common/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "./pages/userSlice";
import "./App.scss";

function App() {
  const location = useLocation();
  const token = useSelector(userDate).credentials;

return (
  <>
    {token ? (
      <>
        <Header />
        <Body />
        <Footer />
      </>
    ) : (
      <>
        {location.pathname === "/" ? (
          <Body />
        ) : (
          <>
            <Header />
            <Body />
            <Footer />
          </>
        )}
      </>
    )}
  </>
);
}

export default App;
