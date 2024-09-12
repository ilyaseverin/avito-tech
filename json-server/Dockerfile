# Устанавливаем базовый образ
FROM node:20-alpine

# Задаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем json-server
RUN npm install -g json-server

# Копируем файл с данными для json-server
COPY db.json .

# Экспонируем порт 8000
EXPOSE 8000

# Запуск json-server
CMD ["json-server", "--watch", "db.json", "--port", "8000"]
