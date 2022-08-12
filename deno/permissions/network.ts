// deno run --allow-net=catfact.ninja ./permissions/network.ts
// deno run --allow-net=catfact.ninja --no-prompt ./permissions/network.ts
// export DENO_NO_PROMPT=1

import { keepAlive } from '../keep-alive.ts';

const catResponse = await fetch('https://catfact.ninja/fact');
const jsonBody = await catResponse.json();
console.log(`😻 ${jsonBody.fact}`);

//*       Default propmpt:
// try {
//   const ipResponse = await fetch('https://api.ipify.org/');
//   const textBody = await ipResponse.text();
//   console.log(`🦄 My IP: ${textBody}`);
// } catch (error) {
//   console.error(error);
// }

//*       Check permission state:
// const ipifyPermissions = await Deno.permissions.query({ name: 'net', host: 'api.ipify.org' });

// if (ipifyPermissions.state === 'granted') {
//   const ipResponse = await fetch('https://api.ipify.org/');
//   const textBody = await ipResponse.text();
//   console.log(`🦄 My IP: ${textBody}`);
// } else {
//   console.log(`😵 It's not allowed to use "api.ipify.org"`);
// }

keepAlive();
