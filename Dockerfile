# Устанавливаем базовый образ
FROM node:20-alpine

# Задаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Компилируем проект
RUN npm run build

# Экспонируем порт, на котором будет работать React-приложение
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]