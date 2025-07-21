const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const { getWebsiteContext } = require('../utils/context');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Message is required and must be a string.' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_API_URL = process.env.OPENROUTER_API_URL;

    if (!OPENROUTER_API_KEY || !OPENROUTER_API_URL) {
      return res.status(500).json({ message: 'Server misconfiguration: missing OpenRouter API key or URL.' });
    }

    const websiteContext = await getWebsiteContext();
    const fullMessage = `${websiteContext}\n\nUser question: ${message}`;

    const response = await axios.post(OPENROUTER_API_URL, {
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
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`
      }
    });

    if (
      !response.data ||
      !response.data.choices ||
      !Array.isArray(response.data.choices) ||
      !response.data.choices[0] ||
      !response.data.choices[0].message ||
      typeof response.data.choices[0].message.content !== 'string'
    ) {
      throw new Error('Unexpected response format from OpenRouter API');
    }

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenRouter API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    res.status(500).json({ message: 'Error processing your request', error: error.message });
  }
});

module.exports = router; 