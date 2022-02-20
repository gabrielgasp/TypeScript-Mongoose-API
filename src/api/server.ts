import connect from '../database/connection';
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);

  await connect();
});
