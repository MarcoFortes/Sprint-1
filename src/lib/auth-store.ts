export type Profile = "Regular" | "Student" | "Senior";

export interface User {
  name: string;
  phone: string;
  idDoc: string;
  nif: string;
  email: string;
  password: string;
  profile: Profile;
}

const KEY = "sdvbo_users";

function read(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(users: User[]) {
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function getUsers() {
  return read();
}

export function addUser(u: User): { ok: boolean; error?: string } {
  const users = read();
  if (users.some((x) => x.email.toLowerCase() === u.email.toLowerCase())) {
    return { ok: false, error: "This email is already registered." };
  }
  if (users.some((x) => x.nif === u.nif)) {
    return { ok: false, error: "This Tax ID (NIF) is already registered." };
  }
  users.push(u);
  write(users);
  return { ok: true };
}

export function findUser(email: string, password: string) {
  return read().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
}