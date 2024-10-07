import { client } from "../index";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
  const insertQuery = "INSERT INTO todos (title, description) VALUES ($1, $2) WHERE user_id=$3 RETURNING title description done id";
  const value = [title,description, userId]

  const response = await client.query(insertQuery, value);
  return response;
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const query = "UPDATE todos set done=$1 where todoId=$2"
  
  const response = await client.query(query, [true, todoId]);
  return response;
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const query = "SELECT title, description, done, id FROM todos WHERE userId=$1";

  const response = client.query(query, [userId]);
  return response;
}