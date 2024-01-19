import express from 'express'
import mongoose from 'mongoose'
import env from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import FileUpload from 'express-fileupload'

import routes from '../routes/routes.js'

env.config();

const app = express();

app.set('port', process.env.PORT || '5000');
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(FileUpload({
  limits: { fileSize: 30 * 1024 * 1024 }
}));
app.use(routes);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB Conected!'))
  .catch((e) => console.error(e.message));

export default app;
