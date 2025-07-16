



import express from 'express';
import Product from '../models/Product.js';



const router = express.Router();


router.post('/', async (req, res)=>{
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});


router.get('/:id', async (req, res)=>{
    const {id}= req.params;
    try {
       const product = await Product.findById(id);
       res.json(product); 
    } catch (error) {
        res.status(500).json({error: error.message});
        console.error(error);
    }
    
});


router.delete('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({message: 'Item cannot be found.'})
    }
});


router.patch('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({message: 'not found'});
        
    }
});

router.get('/', async (req, res)=>{
    const { 
        name, 
        description, 
        price, 
        category, 
        inStock, 
        tags, 
        createdAt,
        
     } = req.query;

     let {page, limit} = req.query;

     const query = {};
     const sort = {};

     if (name){
        query.name = {$eq: name};
     }
     if (description){
        query.description = {$eq: description}
     };

     if (category){
        query.category = {$eq: category};
     };
     if (price){
        query.price = {$lte: parseFloat(price)}
     };
     if (inStock !== undefined){
        query.inStock = inStock === 'true'
     };
     if (tags){
        query.tags = {$in: tags.split(',')};
     };
     if (createdAt){
        query.createdAt = {$gte: new Date(createdAt)}
     };
     
      if (req.query.sort) {
  const [field, order] = req.query.sort.split('_');
  sort[field] = order === 'asc' ? 1 : -1;
    };

     if (!page){
        page = parseInt(page) || 1;
     };
     if (!limit){
        limit = parseInt(limit) || 10;
     }

     console.log('PAGE', page);
     console.log('LIMIT', limit);

     try {
        const products = await Product.find(query)
        .select({__v: 0, _id: 0})
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

        const totalDocs = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalDocs / limit);

        console.log('TOTAL DOCS', totalDocs);
        console.log('TOTALPAGES', totalPages)

        res.json(products)
     } catch (error){
        res.status(500).json({ message: error.message });
        console.error(error);
     }


})


router.get('/db/seed', async (req, res)=>{
    try{
        await Product.deleteMany({});

        const sampleProducts = [
            { name: "Wireless Mouse", description: "Wireless mouse", price: 25.99, category: "Electronics", inStock: true, tags: ['peripherals', 'wireless', 'computer']},
            { name: "Bluetooth Speaker", description: "Speaker", price: 49.99, category: "Electronics", inStock: true, tags: ['speakers', 'wireless', 'audio'] },
            { name: "Yoga Mat", description: "Yoga mat",price: 19.99, category: "Fitness", inStock: true, tags: ['yoga', 'fitness', 'health']  },
            { name: "Running Shoes",  description: "Athletic Shoes",price: 89.99, category: "Footwear", inStock: true, tags: ['running', 'fitness', 'shoes']  },
            { name: "Coffee Maker",  description: "Make that coffee, bruh",price: 39.99, category: "Kitchen", inStock: true, tags: ['coffee', 'morning', 'brew']  },
            { name: "Notebook Pack",  description: "Unlimited writing",price: 12.99, category: "Stationery", inStock: true, tags: ['journal', 'writing', 'stationary']  },
            { name: "Desk Lamp",  description: "Light your world",price: 22.99, category: "Home", inStock: true, tags: ['lamps', 'illumination', 'light']  },
            { name: "Water Bottle",  description: "Hydrate",price: 9.99, category: "Fitness", inStock: true, tags: ['water bottles', 'camping', 'fitness']  },
            { name: "Backpack",  description: "Unlimited Capacity for Nonsense",price: 34.99, category: "Accessories", inStock: true, tags: ['fashion', 'school', 'stowage']  },
            { name: "Smartwatch",  description: "Is it though?",price: 129.99, category: "Electronics", inStock: true, tags: ['time', 'gps', 'bluetooth']  },
    ];
        const createdProducts = await Product.insertMany(sampleProducts);
        res.status(201).json({message: 'Seed successful', products: createdProducts})
        }catch (error) {
            res.status(500).json ({ message: 'Seed failed', error: error.message})
        };
        
    }
);



export default router;