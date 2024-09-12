import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Collapse,
  Divider,
  Box,
  Link,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Order } from "../../types/types";
import { useUpdateOrderStatusMutation } from "../../redux/ordersApi";
import ErrorDialog from "../common/ErrorDialog";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [updateOrderStatus, { isLoading, error }] =
    useUpdateOrderStatusMutation();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  const toggleExpandOrder = () => {
    setExpanded((prev) => !prev);
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`);
  };

  const handleCompleteOrder = async () => {
    if (order.status !== 4) {
      try {
        await updateOrderStatus({ id: order.id, status: 4 }).unwrap();
      } catch (error) {
        setOpenErrorDialog(true);
      }
    }
  };

  const handleCloseErrorDialog = () => {
    setOpenErrorDialog(false);
  };

  return (
    <>
      <Card
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          p: 2,
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Заказ #{order.id}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Дата создания: {new Date(order.createdAt).toLocaleDateString()}
          </Typography>
          <Typography
            color={order.status === 4 ? "green" : "orange"}
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Статус: {order.status === 4 ? "Выполнен" : "Выполняется"}
          </Typography>
          <Typography>
            <strong>Сумма заказа:</strong> {order.total} руб.
          </Typography>
          <Typography>
            <strong>Количество товаров:</strong>{" "}
            {order.items.reduce((acc, item) => acc + item.count, 0)} шт.
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
          <Button
            fullWidth
            onClick={toggleExpandOrder}
            variant="outlined"
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          >
            {expanded ? "Скрыть товары" : "Показать товары"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color={order.status === 4 ? "success" : "primary"}
            disabled={order.status === 4 || isLoading}
            onClick={handleCompleteOrder}
          >
            {order.status === 4 ? "Завершен" : "Завершить заказ"}
          </Button>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider sx={{ mb: 2 }} />
            {order.items.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Link
                  underline="hover"
                  onClick={() => handleItemClick(item.id)}
                  sx={{ cursor: "pointer", color: "primary.main" }}
                >
                  {item.name} - {item.count} шт.
                </Link>
                <Divider />
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>

      {error && (
        <ErrorDialog
          open={openErrorDialog}
          errorCode={(error as any)?.status || 500}
          onClose={handleCloseErrorDialog}
        />
      )}
    </>
  );
};

export default OrderCard;
