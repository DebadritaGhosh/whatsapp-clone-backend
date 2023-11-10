import app from "./app.js";
import logger from "./configs/logger.config.js";



//env variables
const PORT = process.env.PORT || 8000;

let server = app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}`);
    // throw new Error("Error in server");
});

const exitHandler = () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }else{
        process.exit(1);
    }
}

//Handle server errors
const unexpectedErrorHndler = (e) => {
    logger.error(e);
    exitHandler();
}


//Event listeners
process.on("uncaughtException", unexpectedErrorHndler);
process.on("unhandledRejection",unexpectedErrorHndler);

//SIGTERM
process.on("SIGTERM",() => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
})
