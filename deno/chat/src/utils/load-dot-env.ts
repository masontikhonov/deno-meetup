import { ioReadLines, path } from '../deps.ts';
import { MissedEnvVarsError } from '../errors/missed-env-vars.error.ts';

export interface DotEnvOptions {
  path?: string;
  examplePath?: string;
  export?: boolean;
  checkExample?: boolean;
}

export type DotEnvVars = Map<string, string>;

type RequiredVarNames = Set<string>;

const keyValueReg = new RegExp(/^(?!#)(?<key>.*?)(\s*)=(\s*)(?<value>.*)$/);
const quotesReplacer = [new RegExp(/^"(.*)"$/), '$1'] as const;

const DEFAULT_PATH = path.join(Deno.cwd(), './.env');
const DEFAULT_EXAMPLE_PATH = path.join(Deno.cwd(), './.env.example');

const loadEnvs = async (options: DotEnvOptions): Promise<DotEnvVars> => {
  const envVars = new Map<string, string>();

  const dotenvPath = options.path
    ? path.isAbsolute(options.path)
      ? options.path
      : path.join(Deno.cwd(), options.path)
    : DEFAULT_PATH;

  let fileReader: Deno.FsFile | null = null;

  try {
    fileReader = await Deno.open(dotenvPath);

    for await (const line of ioReadLines(fileReader)) {
      const match = keyValueReg.exec(line);
      if (match === null) {
        continue;
      }

      let { key, value } = match.groups!;
      value = value.replace(...quotesReplacer);

      envVars.set(key, value);
      options.export && Deno.env.set(key, value);
    }

    return envVars;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Deno.errors.NotFound(
        `Unable to open .env at this path: ${dotenvPath}. Please try specifying a different path in the options.`,
      );
    }
    throw error;
  } finally {
    fileReader && fileReader.close();
  }
};

const loadExample = async (
  options: DotEnvOptions,
): Promise<RequiredVarNames> => {
  const examplePath = options.path
    ? path.isAbsolute(options.path)
      ? options.path
      : path.join(Deno.cwd(), options.path)
    : DEFAULT_EXAMPLE_PATH;

  let fileReader: Deno.FsFile | null = null;

  try {
    fileReader = await Deno.open(examplePath);

    const envVarNames = new Set<string>();

    for await (const line of ioReadLines(fileReader)) {
      const match = keyValueReg.exec(line);
      if (match === null) {
        continue;
      }

      envVarNames.add(match.groups!.key);
    }

    return envVarNames;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Deno.errors.NotFound(
        `Unable to open .env.example at this path: ${examplePath}. Please try specifying a different path in the options.`,
      );
    }
    throw error;
  } finally {
    fileReader && fileReader.close();
  }
};

const throwIfVarsMissed = (
  dotEnvVars: DotEnvVars,
  exampleVars: RequiredVarNames,
): void => {
  const missedVars: string[] = [];

  for (const name of exampleVars) {
    if (!dotEnvVars.has(name)) {
      missedVars.push(name);
    }
  }

  if (missedVars.length > 0) {
    throw new MissedEnvVarsError(
      missedVars,
      'The following variables are defined in .env.example but are missing from .env',
    );
  }
};

export const loadDotEnv = async (
  options: DotEnvOptions = {},
): Promise<DotEnvVars> => {
  const dotEnvVars = await loadEnvs(options);
  if (options.checkExample) {
    const exampleVars = await loadExample(options);
    throwIfVarsMissed(dotEnvVars, exampleVars);
  }
  return dotEnvVars;
};
