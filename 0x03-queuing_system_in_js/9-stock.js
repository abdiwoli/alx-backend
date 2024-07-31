import express from 'express';
import { createClient } from 'redis';

const client = await createClient();

await client.connect()
    .then(() => {
        console.log('Redis client connected to the server');
    })
    .catch(err => {
        console.log(`Redis client not connected to the server: ${err}`);
    });

const listProducts = [
    { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
    { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
    { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
    { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

const getItemById = (id) => {
    return listProducts.find(product => product.itemId === id);
};

const reserveStockById = async (itemId, stock) => {
    await client.set(itemId.toString(), stock);
};

const getCurrentReservedStockById = async (itemId) => {
    const stock = await client.get(itemId.toString());
    return stock ? Number(stock) : 0;
};

const app = express();
app.use(express.json());

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});


app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const product = getItemById(itemId);
    
    if (!product) {
        return res.status(404).json({ status: "Product not found" });
    }

    try {
        const reservedStock = await getCurrentReservedStockById(itemId);
        const availableStock = product.initialAvailableQuantity - reservedStock;
        
        if (availableStock > 0) {
            await reserveStockById(itemId, reservedStock + 1);
            return res.json({ status: "Reservation confirmed", itemId });
        } else {
            return res.json({ status: "Not enough stock available", itemId });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ status: "Reservation failed" });
    }
});


app.get('/list_products/:itemId', async (req, res) => {
    const itemId = Number(req.params.itemId);
    const product = getItemById(itemId);

    if (product) {
        const reservedStock = await getCurrentReservedStockById(itemId);
        const currentQuantity = product.initialAvailableQuantity - reservedStock;
        res.json({ ...product, currentQuantity });
    } else {
        res.status(404).json({ status: "Product not found" });
    }
});


app.listen(1245, () => {
    console.log('Server is running on port 1245');
});
