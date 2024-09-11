import React from "react";
import AdvertisementsList from "../components/Advertisements/AdvertisementsList";
import { Typography, Box } from "@mui/material";

const AllAdvertisementsPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Все объявления
      </Typography>
      <AdvertisementsList />
    </Box>
  );
};

export default AllAdvertisementsPage;
