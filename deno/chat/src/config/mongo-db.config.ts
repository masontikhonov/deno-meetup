import { dotEnvConfig } from './dot-env.config.ts';

export const mongoDbConfig = {
  db: dotEnvConfig.get('MONGO_DB_NAME')!,
  tls: true,
  servers: dotEnvConfig.get('MONGO_SERVERS')!.split(',').map((host) => ({
    host,
    port: 27017,
  })),
  retryWrites: true,
  credential: {
    username: dotEnvConfig.get('MONGO_USERNAME')!,
    password: dotEnvConfig.get('MONGO_PASSWORD')!,
    db: 'admin',
    mechanism: 'SCRAM-SHA-1',
  },
} as const;
