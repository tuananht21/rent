import express from 'express';
import env from './configs/environment.js'
import cors from 'cors';
import path from 'path';
import connect from './configs/mongodb.js';
import APIs_V1 from './routes/v1/index.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';


const app = express();
const port = env.PORT;


// cors
app.use(cors({
  origin: env.CORS_ORIGIN,
}));

// set response json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder public
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, './public')));


// connectdb
connect();

// router init
app.use('/api/v1', APIs_V1);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});