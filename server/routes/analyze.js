const express = require('express');
const axios = require("axios");
const e = require('express');
const analyzeRoute = express.Router();
// const rateLimit = require('express-rate-limit');

// const limiter = rateLimit({
//      windowMs: 60 * 1000, // 1 minute
//      max: 3, // Allow 3 requests per minute per IP
//      message: { error: "Too many requests, please try again later." }
// });
//use limiter to limit the number of requests to the API as Middleware

// analyze route
analyzeRoute.post('/', async (req, res) => {
     const { sentence } = req.body;
     try {
          console.log("API Called in analyzeRoute");
          const response = await axios.post("https://api.openai.com/v1/chat/completions", {
               "model": "gpt-4o-mini",
               "messages": [
                    {
                         "role": "system",
                         "content": "You are a helpful assistant that rephrases sentences.Only return the rephrased sentences without any additional comments or context."
                    },
                    {
                         "role": "user",
                         "content": `Rephrase this sentence: ${sentence}`
                    },
               ],
               "max_tokens": 150,
               n: 3,
               stop: null,
               temperature: 0.7,
          }, {
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
               }
          });
          // console.log(response.data);
          // res.json(response.data);
          // // res.json(response.data.choices[0].message.content);
          const rephrasedSentence = response.data.choices.map(choice => choice.message.content);
          res.status(200).json(rephrasedSentence || []);
     }
     catch (error) {
          console.log(error);
          res.status(500).json({ error: error.message });
     }
});

module.exports = analyzeRoute;