import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useCreateAdvertisementMutation } from "../../redux/advertisementsApi";

interface CreateAdvertisementFormProps {
  onClose: () => void;
}

const CreateAdvertisementForm: React.FC<CreateAdvertisementFormProps> = ({
  onClose,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const [createAdvertisement] = useCreateAdvertisementMutation();

  const handleSubmit = async () => {
    try {
      await createAdvertisement({
        name,
        description,
        price,
        imageUrl,
        createdAt: new Date().toISOString(),
        views: 0,
        likes: 0,
      });
      onClose();
    } catch (error) {
      console.error("Ошибка при создании объявления", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Цена"
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="URL изображения"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Создать
      </Button>
    </Box>
  );
};

export default CreateAdvertisementForm;
