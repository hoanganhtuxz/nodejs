import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import blogRouter from './routes/blog';
import contactRouter from './routes/contact';
import Auth from './routes/auth';
import expressValidator from 'express-validator';

//cau hinh app
const app = express();
dotenv.config();
///
app.use(bodyParser.json());
///conection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: false,
    useCreateIndex: true
}).then(() => {
    console.log(`database connectted`);
});
mongoose.connection.on('Erreor', err => {

    console.log(`date connect failed , ${err.message}`);
});
// user


app.use(bodyParser.json());
// app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//// api
app.use(cors());
//router product
app.use('/api', productRouter);
//router category
app.use('/api', categoryRouter);
//router blog
app.use('/api', blogRouter);
//router contact
app.use('/api', contactRouter);
// 
app.use('/api', Auth);
//
app.use(morgan('dev'));
///
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})