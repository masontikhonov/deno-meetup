export const HttpMethod = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
] as const;
export type HttpMethod = typeof HttpMethod[number];
