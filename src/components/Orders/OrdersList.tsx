import React, { useState } from "react";
import { useGetOrdersQuery } from "../../redux/ordersApi";
import OrderCard from "./OrderCard";
import Loader from "../common/Loader";
import { Order } from "../../types/types";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Pagination,
  Grid2,
} from "@mui/material";

import { useSearchParams } from "react-router-dom";
import ErrorAlert from "../common/ErrorAler";

const OrdersList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("total");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(4);

  const [searchParams] = useSearchParams();
  const advertisementId = searchParams.get("advertisementId");

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

  const orders =
    responseData?.data.filter((order: Order) =>
      advertisementId
        ? order.items.some((item) => item.id === advertisementId)
        : true
    ) || [];

  const totalPages = responseData?.pages || 1;

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) => (event: any) => {
      setter(event.target.value);
      setPage(1);
    };

  if (isLoading) return <Loader />;
  if (error) {
    const errorCode = (error as any)?.status || null;
    return (
      <ErrorAlert message="Ошибка загрузки заказов" errorCode={errorCode} />
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid2 container spacing={3} sx={{ mb: 3 }}>
        <Grid2 size={{ xs: 12, md: 4 }}>
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
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
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
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Количество заказов на странице</InputLabel>
            <Select
              value={perPage}
              onChange={handleFilterChange(setPerPage)}
              label="Количество заказов на странице"
            >
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={4}>
        {orders.length > 0 ? (
          orders.map((order: Order) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={order.id}>
              <OrderCard order={order} />
            </Grid2>
          ))
        ) : (
          <Typography
            variant="h2"
            component="h2"
            color="textSecondary"
            p={10}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            Заказы не найдены
          </Typography>
        )}
      </Grid2>

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
