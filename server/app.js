require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const analyzeRoute = require('./routes/analyze');
const spellCheckRoute = require("./routes/spellCheck");
const grammarCheckRoute = require("./routes/grammarCheck");



// Middlewares
app.use(cors());// prevent cors error
app.use(express.json());// parse json data
// app.use(express.urlencoded({ extended: true })); // parse url encoded data

// Routes
app.use('/api/analyze', analyzeRoute);
app.use('/api/spellCheck', spellCheckRoute);
app.use('/api/grammarCheck', grammarCheckRoute);
// // mongoose connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
//      console.log("Connected to MongoDB");
// }); 

// start server
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}...`);
});  
