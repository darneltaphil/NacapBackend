const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http');
const CasesRoutes = require('./routes/cases')
const bodyParser = require('body-parser')

//setup server port
const port = process.env.PORT|| 5000;
app.set ('port', port);
http.createServer(app);

const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 204,
  };


// use express middleware
// app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json())

 app.use('/api/v1/cases', CasesRoutes)


app.listen(port, ()=>{console.log(`listen on port ${port}`)});
