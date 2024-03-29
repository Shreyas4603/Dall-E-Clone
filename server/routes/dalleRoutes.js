import express, { Router } from "express";
import * as dotenv from 'dotenv'
import OpenAI from "openai";

import Post from '../mongodb/models/post.js'

dotenv.config()

const router = express.Router();

const configuration = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAI(configuration)
router.route('/').get((req, res) => (res.send("Connecting to DALL-E...")))

router.route('/').post(async (req, res) => {

    try {
        const { prompt } = req.body;
        console.log(prompt)
        const aiResponse =await  openai.images.generate({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        
        const image = aiResponse.data[0].b64_json
        res.status(200).json({ photo: image })
    } catch (error) {
        console.log(error)  
        // res.status(500).send(error.error.message)
    }
})

export default router