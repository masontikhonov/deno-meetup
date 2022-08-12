export class MissedEnvVarsError extends Error {
  constructor(
    varNames: string | string[],
    message = `Some environment variables are required but are missing`,
  ) {
    const readableNames = typeof varNames === 'string'
      ? `\t${varNames}`
      : varNames.map((name) => `\t${name}`).join(`\n`);
    super(`${message}:\n${readableNames}`);
    this.name = this.constructor.name;
  }
}
