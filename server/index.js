import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

import authRouter from './routes/routers.js';

const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `./locales/{{lng}}/translation.json`,
    },
  });

const app = express();

app.use(cors());
app.use(middleware.handle(i18next));
app.use(express.json());
app.use('/users-avatars', express.static(path.join(__dirname, 'users-avatars')));
app.use('/', authRouter);
app.use(helmet());

const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://diploma:diploma@cluster0.f962teg.mongodb.net/diploma?retryWrites=true&w=majority');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
