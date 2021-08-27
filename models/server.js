const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { environmentVariables } = require("../config");
const { dbMongoConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = environmentVariables.port;
    this.productsPath = "/api/products";
    this.categoriesPath = "/api/categories";
    this.searchPath = "/api/search";
    this.uploadsPath = "/api/uploads";

    this.connectMongoDB();
    this.middleware();
    this.routes();
  }

  async connectMongoDB() {
    await dbMongoConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.categoriesPath, require("../routes/categories.routes"));
    this.app.use(this.productsPath, require("../routes/products.routes"));
    this.app.use(this.searchPath, require("../routes/search.routes"));
    this.app.use(this.uploadsPath, require("../routes/uploads.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
