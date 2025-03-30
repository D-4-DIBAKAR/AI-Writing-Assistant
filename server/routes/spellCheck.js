const express = require('express');
const spellCheckRoute = express.Router();



// spellCheck route
spellCheckRoute.post('/', async (req, res) => {
     const { text } = req.body;
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
                                        "text": `You are a helpful assistant that checks and corrects spelling errors in the following text.Only return the corrected text without any additional comments or context..\n\n${text}`
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

module.exports = spellCheckRoute;