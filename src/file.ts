import * as fs from "fs/promises";
import { v4 as uuid4 } from "uuid";

const user_filename = "user.json";
const cred_filename = "cred.json";

let UserState: User[] = [];
let CredentialState: Credential[] = [];

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
  let users: User[];
  try {
    const user = await fs.readFile(user_filename, "utf-8");
    users = JSON.parse(user);
  } catch {
    users = UserState;
  }
  return users.find((user) => user.id === userId);
}

async function getUserByUsername(username: string): Promise<User | undefined> {
  let users: User[];
  try {
    const user = await fs.readFile(user_filename, "utf-8");
    users = JSON.parse(user);
  } catch {
    users = UserState;
  }
  return users.find((user) => user.username === username);
}

async function createUser(username: string): Promise<User> {
  let users: User[];
  try {
    const user = await fs.readFile(user_filename, "utf-8");
    users = JSON.parse(user);
  } catch {
    users = UserState;
  }
  const newUser: User = {
    id: uuid4(),
    username,
  };

  users.push(newUser);

  try {
    await fs.writeFile(user_filename, JSON.stringify(users, null, 2));
  } catch {
    UserState = users;
  }

  return newUser;
}

async function createCredentials(data: Credential): Promise<Credential> {
  let creds: Credential[];
  try {
    const cred = await fs.readFile(cred_filename, "utf-8");
    creds = JSON.parse(cred);
  } catch {
    creds = CredentialState
  }

  creds.push(data);

  try {
    await fs.writeFile(cred_filename, JSON.stringify(creds, null, 2));
  } catch {
    CredentialState = creds;
  }

  return data;
}

async function getCredentialByCredentialId(
  credentialId: string,
): Promise<Credential | undefined> {
  let creds: Credential[];
  try {
    const cred = await fs.readFile(cred_filename, "utf-8");
    creds = JSON.parse(cred);
  } catch {
    creds = CredentialState
  }
  return creds.find((cred) => cred.credential_id === credentialId);
}

async function updateCredentialCounter(credentialId: string, newCounter: number): Promise<Credential | undefined> {
  const creds: Credential[] = [];
  // const cred = await fs.readFile(cred_filename, "utf-8");
  // const creds: Credential[] = JSON.parse(cred);
  const index = creds.findIndex((cred) => cred.credential_id === credentialId);
  if (index === -1) return;
  creds[index].counter = newCounter;

  try {
    await fs.writeFile(cred_filename, JSON.stringify(creds, null, 2));
  } catch {
    CredentialState = creds;
  }

  return creds[index];
}

async function clearUsers(): Promise<void> {
  try {
    await fs.writeFile(user_filename, "[]");
  } catch {
    UserState = [];
  }
}

async function clearCredentials(): Promise<void> {
  try {
    await fs.writeFile(cred_filename, "[]");
  } catch {
    CredentialState = [];
  }
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
  clearUsers,
  clearCredentials,
}
