const express = require('express');
const cors = require('cors');

const adminRoutes = require('./routes/admin'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Not Found')
})

app.listen(port, () => console.log(`Server listening on port ${port}`));