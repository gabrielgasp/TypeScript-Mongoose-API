import mongoose from 'mongoose';

const connect = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';
    await mongoose.connect(dbUri);
    console.log('Database connection established');
  } catch (e) {
    console.error('Database connection failed');
    process.exit(1);
  }
};

export default connect;
