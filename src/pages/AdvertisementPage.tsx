import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetAdvertisementByIdQuery,
  usePatchAdvertisementMutation,
} from "../redux/advertisementsApi";
import Loader from "../components/common/Loader";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Visibility,
  Favorite,
} from "@mui/icons-material";

const AdvertisementPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: advertisement,
    error,
    isLoading,
  } = useGetAdvertisementByIdQuery(id || "");
  const [updateAdvertisement] = usePatchAdvertisementMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isDescriptionOverflowing, setIsDescriptionOverflowing] =
    useState(false);

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (advertisement) {
      setFormData({
        name: advertisement.name || "",
        price: advertisement.price || 0,
        description: advertisement.description || "",
        imageUrl: advertisement.imageUrl || "",
      });
    }
  }, [advertisement]);

  useEffect(() => {
    checkDescriptionOverflow();
  }, [formData]);

  const checkDescriptionOverflow = () => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxHeight = lineHeight * 4;
      setIsDescriptionOverflowing(
        descriptionRef.current.scrollHeight > maxHeight
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    await updateAdvertisement({ id: id || "", ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (advertisement) {
      setFormData({
        name: advertisement.name || "",
        price: advertisement.price || 0,
        description: advertisement.description || "",
        imageUrl: advertisement.imageUrl || "",
      });
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка загрузки объявления</div>;

  return (
    <Box sx={{ paddingY: 4, width: "100%", mx: "auto" }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 1, padding: 2 }}>
            <Box
              sx={{
                height: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={
                  formData.imageUrl ||
                  "https://brilliant24.ru/files/cat/template_01.png"
                }
                alt={formData.name}
                sx={{ maxHeight: "100%", maxWidth: "100%", borderRadius: 2 }}
              />
            </Box>
            {isEditing && (
              <CardContent>
                <TextField
                  label="Изображение (URL)"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </CardContent>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {isEditing ? (
              <TextField
                label="Название"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              formData.name
            )}
          </Typography>

          <Typography variant="h5" gutterBottom>
            {isEditing ? (
              <TextField
                label="Цена"
                name="price"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                type="number"
              />
            ) : (
              `Цена: ${formData.price} руб.`
            )}
          </Typography>

          <Collapse in={showFullDescription} collapsedSize={110} sx={{ py: 2 }}>
            {isEditing ? (
              <TextField
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                maxRows={4}
              />
            ) : (
              <Typography
                ref={descriptionRef}
                sx={{
                  whiteSpace: "pre-line",
                  lineHeight: "1.5",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: showFullDescription ? "none" : 4,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {formData.description}
              </Typography>
            )}
          </Collapse>

          {!isEditing && isDescriptionOverflowing && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                cursor: "pointer",
                mt: -1,
              }}
              onClick={toggleDescription}
            >
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                {showFullDescription ? "Скрыть" : "Развернуть полностью"}
              </Typography>
              <IconButton
                sx={{ p: 0, color: "primary.main", ml: 1 }}
                aria-label="expand"
              >
                {showFullDescription ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Visibility sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {advertisement?.views || 0}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Favorite sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {advertisement?.likes || 0}
              </Typography>
            </Box>
          </Box>

          {isEditing ? (
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Сохранить
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Отмена
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 3 }}
            >
              Редактировать
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvertisementPage;
