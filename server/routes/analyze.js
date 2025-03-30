const express = require('express');
const analyzeRoute = express.Router();


// analyze route
analyzeRoute.post('/', async (req, res) => {
     const { sentence } = req.body;

     try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
               method: "POST",
               headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Local Host",
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({
                    "model": "qwen/qwen2.5-vl-32b-instruct:free",
                    "messages": [
                         {
                              "role": "user",
                              "content": [
                                   {
                                        "type": "text",
                                        "text": `You are a helpful assistant that rephrases sentences.Only return the rephrased sentences without any additional comments or context.\n\nRephrase this sentence: ${sentence}`
                                   }
                              ]
                         }
                    ]
               })
          });


          const responseBody = await response.text();
          console.log(responseBody);


          const data = JSON.parse(responseBody);
          const correctedText = data?.choices?.[0]?.message?.content || "No response";

          res.status(200).json({ correctedText });

     } catch (error) {
          console.error("Error:", error.message);
          res.status(500).json({ error: error.message });
     }
});

module.exports = analyzeRoute;