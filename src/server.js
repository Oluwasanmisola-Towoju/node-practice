const express = require('express');
const app = express();

//Import Routes
const movieRoutes = require('./routes/movieRoutes');


//API Routes
app.use('/movies', movieRoutes);



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);  
});

