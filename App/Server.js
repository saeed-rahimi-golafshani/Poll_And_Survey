const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { AllApiRoutes } = require("./Router/Router");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

module.exports = class Application{
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URL){
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.initConfigRedis();
    this.conectedMongoDb();
    this.createServer();
    this.createRoute();
    this.errorHandler();
  };
  configApplication(){
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({extended: true}));
    this.#app.use(express.static(path.join(__dirname, "..", "Public")));
    this.#app.use(cors());
    this.#app.use(morgan("dev"));

    this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup( 
      swaggerJSDoc({
          swaggerDefinition: {
              openapi: "3.0.0",
              info : {
                  title: "Polling Website",
                  version: "2.0.0",
                  description: "سایت نظرسنجی"
              },
              servers : [{
                  url : `http://localhost:${this.#PORT}`
              }],
              components:{
                  securitySchemes:{
                      BearerAuth:{
                          type: "http",
                          scheme: "bearer",
                          bearerFormat: "JWT" 
                      }
                  }
              },
              security: [{BearerAuth: []}]
          },
          apis: ["./App/Routers/**/*.js"]
      }), 
      {explorer: true}
      )
    )

  };
  initConfigRedis(){
    require("./Utills/Init_Redis")
  };
  createServer(){
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("Run >< http://localhost:" + this.#PORT);
    })
  };
  conectedMongoDb(){
    mongoose.set('strictQuery', false);
    mongoose.connect(this.#DB_URL, (error) => {
      if(!error) return console.log("App Is Connected To MongoDB...")
      return console.log("App Is Not Connected To MongoDB...");
    })
  
    const db = mongoose.connection;
    db.on("connected", () => {
    console.log("Mongoose Connected to DB...");
    })
    db.on("disconnected", () =>{
        console.log("Mongoose Connection Is Disconnected...");
    })
    process.on("SIGINT", async () =>{
        await db.close();
        console.log("disconnected...");
        process.exit(0)
    })
  };
  createRoute(){
    this.#app.use(AllApiRoutes);
  };
  errorHandler(){
    this.#app.use((req, res, next) =>{
        next(createError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
    })
    
    this.#app.use((error, req, res, next) => {
        const servererror = createHttpError.InternalServerError();
        const statusCode = error?.status || servererror.status ;
        const message = error?.message || servererror.message
        return res.status(statusCode).send({
            errors : {
                statusCode,
                message
            }
        })
    })
  };
}