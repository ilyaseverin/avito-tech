import React from "react";
import { useGetAdvertisementsQuery } from "../../redux/advertisementsApi";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const AdvertisementsPage: React.FC = () => {
  const {
    data: advertisements,
    error,
    isLoading,
  } = useGetAdvertisementsQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;

  return (
    <div>
      <Typography variant="h4">Все объявления</Typography>
      <Grid container spacing={2}>
        {advertisements?.map((ad) => (
          <Grid item key={ad.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{ad.name}</Typography>
                <Typography variant="body2">Цена: {ad.price} руб.</Typography>
                <Typography variant="body2">Просмотры: {ad.views}</Typography>
                <Typography variant="body2">Лайки: {ad.likes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AdvertisementsPage;
