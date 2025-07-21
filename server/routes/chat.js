const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { getProductContext, getWebsiteContext } = require('../utils/context');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    const productContext = await getProductContext();
    const websiteContext = await getWebsiteContext();
    const fullMessage = `${websiteContext}\n\n${productContext}\n\nUser question: ${message}`;

    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'deepseek/deepseek-chat-v3-0324:free',
      messages: [
        {
          "role": "system",
          "content": "You are a helpful, concise assistant for the BEYOUND brand. Only answer questions about the brand, its mission, its products, or how to get involved, using the provided context. Never mention code, technical details, or anything outside the brand's story and offerings. Keep your answers short and to the point."
        },
        {
          "role": "user",
          "content": fullMessage
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenRouter API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ message: 'Error processing your request' });
  }
});

module.exports = router; 