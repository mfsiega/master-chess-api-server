import * as mongoDB from "mongodb";

const NUMBER_OF_GAMES = 5107145;

// For convenience in dev.
export async function getHardcodedMongoClient(): Promise<mongoDB.Collection> {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db: mongoDB.Db = client.db('game_database');
  const gamesCollection: mongoDB.Collection = db.collection('games');
  // eslint-disable-next-line no-console
  console.log(`numGames=${await gamesCollection.estimatedDocumentCount()}`);
  return gamesCollection;
}

interface GameRecord {
  pgn: string;
}

export class GetRandomGameHandler {
  constructor(private readonly games: mongoDB.Collection) {}

  async getRandomGame(): Promise<string> {
    const gameIndex = Math.floor(Math.random()*NUMBER_OF_GAMES);
    const game = (await this.games.findOne({game_id: `${gameIndex}`}) as unknown) as GameRecord;
    return game.pgn;
  }
}

/*// For testing.
async function main(): Promise<void> {
  const getRandomGameHandler = new GetRandomGameHandler(await getHardcodedMongoClient());
  // eslint-disable-next-line no-console
  console.log(await getRandomGameHandler.getRandomGame());
}

main().then(() => {
  process.exit(0);
});*/