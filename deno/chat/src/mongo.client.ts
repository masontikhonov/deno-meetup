import { log, MongoClient } from './deps.ts';
import { mongoDbConfig } from './config/mongo-db.config.ts';

const mongoClient = new MongoClient();

try {
  await mongoClient.connect(mongoDbConfig);
  log.info('💾 Connected to the MongoDB');
} catch (error) {
  log.critical(`❌ Error while connecting to the MongoDB:\n${error.message}`);
  Deno.exit(1);
}

export { mongoClient };
