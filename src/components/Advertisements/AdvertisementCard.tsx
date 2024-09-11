import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Advertisement } from "../../types/types";

interface AdvertisementCardProps {
  advertisement: Advertisement;
}

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({
  advertisement,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/advertisements/${advertisement.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        padding: 2,
        borderRadius: 5,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={
            advertisement.imageUrl ||
            "https://brilliant24.ru/files/cat/template_01.png"
          }
          alt={advertisement.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="h6">{advertisement.name}</Typography>
        <Typography color="textSecondary">
          Цена: {advertisement.price} руб.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Visibility sx={{ mr: 1 }} />
            <Typography>{advertisement.views}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Favorite sx={{ mr: 1 }} />
            <Typography>{advertisement.likes}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdvertisementCard;
