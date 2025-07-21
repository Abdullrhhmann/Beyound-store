const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { getWebsiteContext } = require('../utils/context');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const OPENROUTER_API_KEY = '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';
    const websiteContext = await getWebsiteContext();
    const fullMessage = `${websiteContext}\n\nUser question: ${message}`;

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
        'Authorization': `Bearer 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`
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenRouter API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ message: 'Error processing your request' });
  }
});

module.exports = router; 