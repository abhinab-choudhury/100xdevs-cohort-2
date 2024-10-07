import { client } from "..";

/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
  const query = "INSERT INTO users VALUES ($1, $2, $3) RETURNING username, password, name";

  let response = await client.query(query, [username, password, name]);
  return response;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  const query = "SELECT username, password, name FROM users WHERE id=$1 RETURNING username, password, name";
  
  const response =  await client.query(query, [userId]);
  return response;
}
