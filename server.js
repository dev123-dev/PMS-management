const express = require("express");
const connectDB = require("./config/db");
//const path = require('path');
const app = express();


app.use(express.json({ limit: "20mb", extended: true }));

app.use(
  express.urlencoded({ limit: "20mb", extended: true, parameterLimit: 50000 })
);



// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/settings", require("./routes/api/settings"));
app.use("/api/projects", require("./routes/api/projects"));
app.use("/api/client", require("./routes/api/client"));
app.use("/api/regions", require("./routes/api/regions"));
app.use("/api/dct", require("./routes/api/dct"));
app.use("/api/sct", require("./routes/api/sct"));
app.use("/api/other", require("./routes/api/other"));
app.use("/api/enquiry",require("./routes/api/enquiry"));

// Set static folder for client build Serve static assets in production
//app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

const PORT = process.env.PORT || 5439;

// step 3: Heroku

// while adding below colde for deployment
//  "proxy": "http://localhost:5439"
//  this above code removed from client>package.json last line

// Inside main package.json we removed this below code and placed other script code
//  "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server",
//     "server": "nodemon server ",
//     "client": "npm start --prefix client",
//     "dev": "concurrently \"npm run server\" \"npm run client\" "
//   },
// if (process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
//     // const path = require("path");
//     // app.get("*", (req, res) => {
//     //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     // })
// }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
