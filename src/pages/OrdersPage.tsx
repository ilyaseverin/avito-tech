import { Box, Typography } from "@mui/material";
import OrdersList from "../components/Orders/OrdersList";

const OrdersPage: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Все заказы
      </Typography>
      <OrdersList />
    </Box>
  );
};

export default OrdersPage;
