export interface User {
    userId: number;
    userName: string;
    userLastName: string;
    userEmail: string;
    passwordHash: string;
    passwordSalt: string;
    status: boolean;
    findexNote: number;
  }