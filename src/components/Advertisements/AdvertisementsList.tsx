import React, { useState, useMemo } from "react";
import {
  Box,
  Grid2,
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
  Typography,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useGetAdvertisementsQuery } from "../../redux/advertisementsApi";
import AdvertisementCard from "./AdvertisementCard";
import Loader from "../common/Loader";
import CreateAdvertisementForm from "./CreateAdvertisementForm";
import { Advertisement } from "../../types/types";
import useDebounce from "../../hooks/useDebounce";
import ErrorAlert from "../common/ErrorAler";

const AdvertisementsList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortBy, setSortBy] = useState<string>("price");
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const {
    data: responseData,
    isLoading,
    error,
  } = useGetAdvertisementsQuery({
    page,
    per_page: limit,
    sort: sortBy,
    searchQuery: debouncedSearchQuery,
  });

  const allAdvertisements = useMemo(
    () => responseData?.data || [],
    [responseData]
  );
  const totalPages = responseData?.pages || 1;

  const filteredAdvertisements = useMemo(() => {
    if (debouncedSearchQuery.length >= 3) {
      return allAdvertisements.filter((ad: Advertisement) =>
        ad.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }
    return allAdvertisements;
  }, [debouncedSearchQuery, allAdvertisements]);

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
  if (error) {
    const errorCode = (error as any)?.status || null;
    return (
      <ErrorAlert message="Ошибка загрузки объявлений" errorCode={errorCode} />
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ flex: 1, mr: 2 }}>
          <TextField
            label="Поиск объявлений"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
          {searchQuery.length > 0 && searchQuery.length < 3 && (
            <Typography color="error" variant="caption">
              Введите еще минимум {3 - searchQuery.length} символа(ов) для
              поиска
            </Typography>
          )}
        </Box>
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
            <MenuItem value="-views">По просмотрам</MenuItem>
            <MenuItem value="-likes">По лайкам</MenuItem>
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

      <Grid2 container spacing={4}>
        {filteredAdvertisements.length > 0 ? (
          filteredAdvertisements.map((ad: Advertisement) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={ad.id}>
              <AdvertisementCard advertisement={ad} />
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
            Объявления не найдены
          </Typography>
        )}
      </Grid2>

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
