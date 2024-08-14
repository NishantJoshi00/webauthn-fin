import * as fs from "fs/promises";
import { v4 as uuid4 } from "uuid";

const user_filename = "user.json";
const cred_filename = "cred.json";

type User = {
  id: string;
  username: string;
};

type Credential = {
  id: number;
  user_id: string;
  credential_id: string;
  public_key: string;
  counter: number;
  transports: string[];
};

async function getUserById(userId: string): Promise<User | undefined> {
  const users: User[] = [];
  return users.find((user) => user.id === userId);
}

async function getUserByUsername(username: string): Promise<User | undefined> {
  const users: User[] = [];
  return users.find((user) => user.username === username);
}

async function createUser(username: string): Promise<User> {
  const users: User[] = [];
  const newUser: User = {
    id: uuid4(),
    username,
  };
  users.push(newUser);
  // await fs.writeFile(user_filename, JSON.stringify(users, null, 2));
  return newUser;
}

async function createCredentials(data: Credential): Promise<Credential> {
  // const cred = await fs.readFile(cred_filename, "utf-8");
  // const creds: Credential[] = JSON.parse(cred);
  const creds: Credential[] = []
  creds.push(data);
  // await fs.writeFile(cred_filename, JSON.stringify(creds, null, 2));
  return data;
}

async function getCredentialByCredentialId(
  credentialId: string,
): Promise<Credential | undefined> {
  const creds: Credential[] = [];
  // const cred = await fs.readFile(cred_filename, "utf-8");
  // const creds: Credential[] = JSON.parse(cred);
  return creds.find((cred) => cred.credential_id === credentialId);
}

async function updateCredentialCounter(credentialId: string, newCounter: number): Promise<Credential | undefined> {
  const creds: Credential[] = [];
  // const cred = await fs.readFile(cred_filename, "utf-8");
  // const creds: Credential[] = JSON.parse(cred);
  const index = creds.findIndex((cred) => cred.credential_id === credentialId);
  if (index === -1) return;
  creds[index].counter = newCounter;
  // await fs.writeFile(cred_filename, JSON.stringify(creds, null, 2));
  return creds[index];
}

export {
  getUserById,
  getUserByUsername,
  createUser,
  createCredentials,
  getCredentialByCredentialId,
  updateCredentialCounter,
  type User,
  type Credential,
}
