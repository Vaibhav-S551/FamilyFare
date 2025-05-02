// 
import express from 'express';
import { addFood ,listFood,removeFood} from '../controllers/foodController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const foodRouter = express.Router();

// Multer Storage Engine
const storage = multer.diskStorage({
    destination: 'uploads', // Directory to store uploaded files
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`); // Use a unique filename
    }
});

// File Upload Middleware
const upload = multer({
    storage: storage
});

// Route to handle food addition with file upload middleware
foodRouter.post('/add', upload.single('image'), addFood); 
foodRouter.get("/list",listFood)// 'image' is the field name in the form
foodRouter.post('/remove',removeFood)

export default foodRouter;
