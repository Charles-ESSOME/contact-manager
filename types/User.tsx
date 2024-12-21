export interface User {
  id: string;
  firstName: string;
  lastName: string;
  emails: string[];
  phones: string[];
  status: boolean;
  category: UserCategory;
  createdAt: string;
  updatedAt: string;
}


export enum UserCategory {
  VIP = 'VIP',
  CLASSIC= 'CLASSIC'
}
