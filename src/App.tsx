import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../src/components/common/Navigation";
import AdvertisementsPage from "../src/components/pages/AdvertisementsPage";
import OrdersPage from "../src/components/pages/OrdersPage";
import { Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/advertisements" element={<AdvertisementsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
