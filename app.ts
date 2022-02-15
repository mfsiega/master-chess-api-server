import * as express from "express";

import {getHardcodedMongoClient, GetRandomGameHandler} from './src/get-random-game';
const mongoPromise = getHardcodedMongoClient();
let gameCollection = undefined;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/api/info', (_req, res) => {
  res.send({ application: 'master-chess-api-server', version: '1.0' });
});
app.get('/api/v1/getRandomGame', async (_req, res) => {
  if (gameCollection === undefined) {
    gameCollection = await getHardcodedMongoClient();
  }
  const getRandomHandler = new GetRandomGameHandler(gameCollection);
  res.send({pgn: await getRandomHandler.getRandomGame()});
});
app.listen(8080, () => console.log(`Listening on: 8080`));