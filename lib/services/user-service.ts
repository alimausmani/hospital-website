import { STORAGE_KEYS } from '@/lib/constants/storage-keys';
import { getStorageItem, setStorageItem } from '@/lib/storage/local-storage';
import type { ProfileInput, User } from '@/lib/types/auth';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getUsers = (): User[] =>
  getStorageItem<User[]>(STORAGE_KEYS.USERS, []);

const saveUsers = (users: User[]): void => {
  setStorageItem(STORAGE_KEYS.USERS, users);
};

export const userService = {
  getUsers,
  findByEmail(email: string): User | undefined {
    const normalizedEmail = normalizeEmail(email);
    return getUsers().find((user) => normalizeEmail(user.email) === normalizedEmail);
  },
  createUser(input: Omit<User, 'id'>): User {
    if (this.findByEmail(input.email)) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Date.now().toString(),
      ...input,
      email: normalizeEmail(input.email),
    };

    saveUsers([...getUsers(), newUser]);
    return newUser;
  },
  updateProfile(userId: string, input: ProfileInput): User {
    const users = getUsers();
    const existing = users.find((user) => user.id === userId);
    if (!existing) {
      throw new Error('User not found.');
    }

    const normalizedEmail = normalizeEmail(input.email);
    const emailInUse = users.some((user) => user.id !== userId && normalizeEmail(user.email) === normalizedEmail);
    if (emailInUse) {
      throw new Error('This email is already used by another account.');
    }

    const updatedUser: User = {
      ...existing,
      ...input,
      email: normalizedEmail,
    };

    const updatedUsers = users.map((user) => (user.id === userId ? updatedUser : user));
    saveUsers(updatedUsers);
    return updatedUser;
  },
  updatePassword(email: string, password: string): User {
    const normalizedEmail = normalizeEmail(email);
    const users = getUsers();
    const user = users.find((item) => normalizeEmail(item.email) === normalizedEmail);

    if (!user) {
      throw new Error('No account found with this email.');
    }

    const updatedUser: User = { ...user, password };
    saveUsers(users.map((item) => (item.id === user.id ? updatedUser : item)));
    return updatedUser;
  },
  validateCredentials(email: string, password: string): User {
    const user = this.findByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }
    return user;
  },
};
