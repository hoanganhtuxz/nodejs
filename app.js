import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
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
//router product
app.use('/api', productRouter);
//router category
app.use('/api', categoryRouter);



//
app.use(morgan('dev'));
///
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is runing on port : ${port}`);
})