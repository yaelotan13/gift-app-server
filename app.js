const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'https://master.d2xagu9zkqafsg.amplifyapp.com',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) 

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Not Found')
})

app.listen(port, () => console.log(`Server listening on port ${port}`));