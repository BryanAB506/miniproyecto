const express = require('express')
const cors = require('cors') // importar cartas
const app = express();
const productRoutes = require('./src/Routes/ProductRoutes')


const PORT = process.env.PORT || 3000;

app.use(cors())

app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
    console.log(`servidor coorriendo en http://localhost:${PORT}`);
})
