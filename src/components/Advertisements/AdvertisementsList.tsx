import React, { useState } from "react";
import {
  Box,
  Grid,
  Pagination,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useGetAdvertisementsQuery } from "../../redux/advertisementsApi";
import AdvertisementCard from "./AdvertisementCard";
import Loader from "../common/Loader";
import CreateAdvertisementForm from "./CreateAdvertisementForm";
import { Advertisement } from "../../types/types";
import useDebounce from "../../hooks/useDebounce";

const AdvertisementsList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortBy, setSortBy] = useState<string>("price");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const {
    data: advertisements = [],
    isLoading,
    error,
  } = useGetAdvertisementsQuery();

  const filteredAds = advertisements
    .filter((ad) =>
      debouncedSearchQuery.length >= 3
        ? ad.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "likes") return b.likes - a.likes;
      return 0;
    });

  const totalPages = Math.ceil(filteredAds.length / limit);
  const paginatedAds = filteredAds.slice((page - 1) * limit, page * limit);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки объявлений</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <TextField
          label="Поиск объявлений"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, mr: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={handleOpenCreateDialog}
          sx={{ minWidth: 250, borderRadius: 2 }}
        >
          Добавить объявление
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Фильтрация объявлений</InputLabel>
          <Select
            value={sortBy}
            label="Фильтрация объявлений"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="price">По цене</MenuItem>
            <MenuItem value="views">По просмотрам</MenuItem>
            <MenuItem value="likes">По лайкам</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Количество объявлений на странице</InputLabel>
          <Select
            value={limit}
            label="Количество объявлений на странице"
            onChange={handleLimitChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {paginatedAds.map((ad: Advertisement) => (
          <Grid item xs={12} sm={6} md={4} key={ad.id}>
            <AdvertisementCard advertisement={ad} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogTitle>Создать новое объявление</DialogTitle>
        <DialogContent>
          <CreateAdvertisementForm onClose={handleCloseCreateDialog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdvertisementsList;
