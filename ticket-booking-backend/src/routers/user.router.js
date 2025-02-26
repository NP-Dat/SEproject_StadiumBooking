import express from 'express';
const router = express.Router();

router.all('/', (req, res) => {
    res.json({message: "return from user router"});
    
    next();
});

router.post('/', (req, res) => {
    res.json(req.body);
});


export default router;