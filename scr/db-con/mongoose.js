const mongoose = require('mongoose');
console.log(process.env.MONGO_URL)
mongoose.connect('mongodb://localhost/Question-Generation-System',
{useNewUrlParser: true, 
    useUnifiedTopology:true,
    useCreateIndex:true,
useFindAndModify:false}
)
