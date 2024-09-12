import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { darkTheme } from "../../utils/themeMode";

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Личный кабинет продавца
          </Typography>
          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/advertisements"
              sx={{
                borderBottom: isActive("/advertisements")
                  ? "2px solid white"
                  : "none",
                borderRadius: 0,
              }}
            >
              Объявления
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/orders"
              sx={{
                borderBottom: isActive("/orders") ? "2px solid white" : "none",
                borderRadius: 0,
              }}
            >
              Заказы
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navigation;
