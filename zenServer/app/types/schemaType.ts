export interface UserAccountType {
  account: string;
  password: string;
  userName: string;
  isAdmin: number;
  secretToken: string;
  phone: number;

  createdAt: Date;
  updatedAt: Date;

}
