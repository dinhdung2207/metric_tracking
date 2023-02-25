import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { connectDb } from './src/models';
import router from './src/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const dbURL = process.env.DB_URL as string;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app
.use(bodyParser.json())
.use("/api", router);

connectDb(dbURL)
  .then(async () => {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error: any) => {
    console.log("❌ Connect to Mongodb Error", { error });
  })