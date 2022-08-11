import { DotEnvVars, loadDotEnv } from '../utils/load-dot-env.ts';
import { log } from '../deps.ts';

let dotEnvConfig: DotEnvVars;

try {
  dotEnvConfig = await loadDotEnv({ export: true, checkExample: true });
  log.info(`🔑 ".env" parsed and merged with "Deno.env"`);
} catch (error) {
  log.critical(`❌ ${error.message}`);
  Deno.exit(1);
}

export { dotEnvConfig };
