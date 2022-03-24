import 'dotenv/config';
import { Seeder } from 'mongo-seeding';
import path from 'path';

const config = {
  database: process.env.MONGO_URI || 'mongodb://localhost:27017/ts-mongoose-api',
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve('dist/database/seed/data'));

seeder
  .import(collections)
  .then(() => {
    console.log('Seeding success');
  })
  .catch((err: Error) => {
    console.log('Seeding failed');
    console.log(err);
  });
