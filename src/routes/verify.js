import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const jwtSecret= process.env.JWT_SECRET;

router.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid header' });
    }
    const token = authHeader.split(' ')[1]; 
    try {   
        const decoded = jwt.verify(token, jwtSecret);
        req.decoded = decoded;  
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauthorized Access' });
    }
  });
export default router;