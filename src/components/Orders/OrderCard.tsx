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

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleExpandOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/advertisements/${itemId}`);
  };

  return (
    <Card
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        p: 2,
        backgroundColor: "#fff",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 4,
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
        <Typography gutterBottom>
          <strong>Сумма заказа:</strong> {order.total} руб.
        </Typography>
        <Typography gutterBottom>
          <strong>Количество товаров:</strong>{" "}
          {order.items.reduce((acc, item) => acc + item.count, 0)} шт.
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button
          onClick={() => toggleExpandOrder(order.id)}
          variant="outlined"
          color="primary"
          endIcon={expandedOrder === order.id ? <ExpandLess /> : <ExpandMore />}
        >
          {expandedOrder === order.id ? "Скрыть товары" : "Показать все товары"}
        </Button>
        <Button
          variant="contained"
          color={order.status === 4 ? "success" : "primary"}
          disabled={order.status === 4}
        >
          {order.status === 4 ? "Завершен" : "Завершить заказ"}
        </Button>
      </CardActions>

      <Collapse in={expandedOrder === order.id} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider sx={{ mb: 2 }} />
          {order.items.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Link
                underline="hover"
                onClick={() => handleItemClick(item.id)}
                sx={{
                  cursor: "pointer",
                  color: "#1976d2",
                }}
              >
                {item.name} - {item.count} шт.
              </Link>
              <Divider />
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default OrderCard;
