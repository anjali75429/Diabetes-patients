const express = require('express');
const cors = require('cors');

const EquipmentRouter = require('./routers/equipmentRouter');
const FoodRouter = require('./routers/foodRouter');
const UserRouter = require('./routers/userRouter');
const ArticleRouter = require('./routers/articlesRouter');
const OrderRouter = require('./routers/orderRouter');
const ContactRouter = require(`./routers/contactRouter`);
// const something = require('./somefile');


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());



app.use('/equipment', EquipmentRouter);
app.use('/food', FoodRouter);
app.use('/user', UserRouter);
app.use('/article', ArticleRouter);
app.use('/order', OrderRouter);
app.use(`/contact`, ContactRouter);

// app.use('/api/articles', articleRoutes);

app.listen(port, () => console.log('Server running on port 5000'));