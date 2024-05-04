// require('dotenv').config();
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser')
// const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json())
// app.use('/api', taskRoutes);
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
var cors =require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
const taskRoutes = require('./taskRoutes'); 
app.use(cors());
app.use('/api', taskRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

