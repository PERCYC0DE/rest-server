const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      authPath: "/api/auth",
      categoriesPath: "/api/categories",
      usersPath: "/api/users",
    };

    // Connect to Database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Rutas
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Read and Parse Body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.authPath, require("../routes/auth.routes"));
    this.app.use(
      this.paths.categoriesPath,
      require("../routes/categories.routes")
    );
    this.app.use(this.paths.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}

module.exports = Server;
