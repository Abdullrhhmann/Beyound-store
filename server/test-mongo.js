const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://beyound:admin@beyound.pkowrj5.mongodb.net/?retryWrites=true&w=majority&appName=beyound', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connection successful!');
  process.exit(0);
})
.catch(err => {
  console.error('Connection failed:', err);
  process.exit(1);
}); 