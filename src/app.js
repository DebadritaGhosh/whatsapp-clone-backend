import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"; // Error logger (middleware)
import helmet from "helmet"; // Basic Security (middleware)
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from 'cors';
import createHttpError from "http-errors";
//dotEnv config
dotenv.config();

//creating express app
const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

//Helmet
app.use(helmet());

//Parse JSON request to url
app.use(express.json());

//Parse json request body
app.use(express.urlencoded({ extended: true }));

//Sanitize request data
app.use(ExpressMongoSanitize());

//Enable cookie parser
app.use(cookieParser());

//Enable compression (gZip)
app.use(compression());

//File upload
app.use(fileUpload({
    useTempFiles: true
}));

//Cors
app.use(cors({
    origin: "http://localhost:3000"
}));


app.use(async (req, res, next) => {
    next(createHttpError.NotFound("THis route does not exist"));
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
});


export default app;