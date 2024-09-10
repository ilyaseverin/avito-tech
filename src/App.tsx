import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../src/components/common/Navigation";
import AdvertisementsPage from "../src/components/pages/AdvertisementsPage";
import OrdersPage from "../src/components/pages/OrdersPage";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/advertisements" element={<AdvertisementsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
