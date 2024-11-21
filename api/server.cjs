const express = require('express');
const routes = require('./routes/appointments.js')
const app = express();

app.use(express.json());
app.use(routes);
const PORT = 800;

app.listen(PORT, () => {
    console.log('Server Listening on PORT:', PORT)
});