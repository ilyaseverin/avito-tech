Here is the instruction for running your current project:

# Project Setup Instructions

## 1. Install Dependencies

First, make sure you have [Node.js](https://nodejs.org/) (version 20 or higher) and [npm](https://www.npmjs.com/) installed. Then, run the following command to install all project dependencies:

```bash
npm install
```

## 2. Run the App in Development Mode

To start the project in development mode, use the following command:

```bash
npm start
```

After starting, the app will be available in your browser at [http://localhost:3000](http://localhost:3000).

## 3. Build the Project for Production

To create a production-ready build of the app, use this command:

```bash
npm run build
```

The build will be placed in the `build` folder. This version is optimized for best performance and is ready for deployment on a server.

## 4. Running JSON Server (if used)

If you are using `json-server` to simulate an API, start it separately with the following command:

```bash
npm run server
```

The server will be available at [http://localhost:8000](http://localhost:8000).

## 5. Running Tests

To run the tests, use the following command:

```bash
npm test
```

## 6. Docker Setup

### 6.1. Build Docker Image

If you want to run the app with Docker, first build the Docker image:

```bash
docker build -t your-app-name .
```

### 6.2. Run Docker Container

After building the Docker image, start it using this command:

```bash
docker run -p 3000:3000 your-app-name
```

Now the app will be available at [http://localhost:3000](http://localhost:3000).

### 6.3. Docker Compose (if used)

If you are using `docker-compose.yml`, you can start the app and any related services (e.g., JSON server) by running:

```bash
docker-compose up
```

## 7. Environment Variables

Create a `.env` file in the root of your project and add any necessary environment variables, for example:

```bash
REACT_APP_API_URL=http://localhost:8000
```

## Вопросы/проблемы

Параметры "name_like" и "q" не работают в последней версии json-server [https://github.com/typicode/json-server/issues/1509](https://github.com/typicode/json-server/issues/1509). Принял решение филтровать данные для поиска на стороне клиента. Можно было откати версию до 0.17.0, но не стал
