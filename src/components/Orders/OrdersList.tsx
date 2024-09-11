import React, { useState } from "react";
import { useGetOrdersQuery } from "../../redux/ordersApi";
import OrderCard from "./OrderCard";
import Loader from "../common/Loader";
import { Order } from "../../types/types";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Pagination,
} from "@mui/material";

const OrdersList = () => {
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("total");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const {
    data: responseData,
    error,
    isLoading,
  } = useGetOrdersQuery({
    status: statusFilter ?? undefined,
    page,
    per_page: perPage,
    sort: sortOrder,
  });

  const orders = responseData?.data || [];
  const totalPages = responseData?.pages || 1;

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) => (event: any) => {
      setter(event.target.value);
      setPage(1);
    };

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки заказов</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Фильтр по статусу</InputLabel>
            <Select
              value={statusFilter?.toString() || ""}
              onChange={handleFilterChange(setStatusFilter)}
              label="Фильтр по статусу"
            >
              <MenuItem value="">Все</MenuItem>
              <MenuItem value="0">Выполняется</MenuItem>
              <MenuItem value="4">Выполнен</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Сортировка по цене</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleFilterChange(setSortOrder)}
              label="Сортировка по цене"
            >
              <MenuItem value="total">По возрастанию</MenuItem>
              <MenuItem value="-total">По убыванию</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Количество заказов на странице</InputLabel>
            <Select
              value={perPage}
              onChange={handleFilterChange(setPerPage)}
              label="Количество заказов на странице"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {orders.length > 0 ? (
          orders.map((order: Order) => (
            <Grid item xs={12} sm={12} md={6} lg={6} key={order.id}>
              <OrderCard order={order} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Заказы не найдены</Typography>
        )}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default OrdersList;
