



import express from 'express';
import Product from '../models/Product';



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





export default router;