import dbConnect from '../database/connection';
import app from './app';

const PORT = process.env.PORT || 3000;

const start = async () => {
  await dbConnect();

  app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
