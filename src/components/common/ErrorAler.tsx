import React from "react";
import { Alert } from "@mui/material";

interface ErrorAlertProps {
  message: string;
  errorCode?: number;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, errorCode }) => {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      {message}
      {errorCode && (
        <div>
          <strong>Код ошибки:</strong> {errorCode}
        </div>
      )}
    </Alert>
  );
};

export default ErrorAlert;
