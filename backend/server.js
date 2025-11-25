const express = require('express');
const app = express();
app.get('/api', (req, res) => res.json({ message: "Hello from Backend!", timestamp: new Date(), success: true }));
app.get('/db', (req, res) => res.json({ message: "Data from Database", data: [{ id:1, name:"Alice" }], success: true }));
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on ${PORT}`));
