import mongoose from 'mongoose';

const connect = async () => {
  try {
    const dbUri = 'mongodb://localhost:27017/myapp';
    await mongoose.connect(dbUri);
    console.log('DB connected');
  } catch (e) {
    console.error('Could not connect to DB');
    process.exit(1);
  }
};

export default connect;
