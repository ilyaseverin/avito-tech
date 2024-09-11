import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";

interface ErrorDialogProps {
  open: boolean;
  errorCode?: string | number;
  onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  errorCode,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 0",
        }}
      >
        <DialogTitle
          id="error-dialog-title"
          sx={{ display: "flex", alignItems: "center", gap: 1, padding: 0 }}
        >
          <ErrorOutlineIcon sx={{ color: "warning.main", fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "text.primary" }}
          >
            Ошибка
          </Typography>
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ color: "grey.500" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ paddingTop: 1 }}>
        <DialogContentText
          id="error-dialog-description"
          sx={{
            textAlign: "center",
            marginBottom: 2,
            fontSize: "1.1rem",
            color: "text.secondary",
          }}
        >
          Произошла ошибка. Пожалуйста, попробуйте снова.
        </DialogContentText>

        {errorCode && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              marginTop: 2,
              padding: 1.5,
              borderRadius: 2,
            }}
          >
            <Typography variant="body1">
              <strong>Код ошибки: {errorCode}</strong>
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: 150, borderRadius: 2 }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
