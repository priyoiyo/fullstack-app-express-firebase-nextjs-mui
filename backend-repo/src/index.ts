const express = require('express'); // Renamed 'express' to 'expressApp'
const router = require("../routes");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { setupSwagger } =require('../src/swagger')
require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express(); // Using the renamed variable 'expressApp'
app.use(cors({origin: `*`}));
app.options('https://localhost:3000', cors());
app.use(express.json())
app.use(cookieParser())
app.use(router)

setupSwagger(app);


app.get('/', (req:any, res:any) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});