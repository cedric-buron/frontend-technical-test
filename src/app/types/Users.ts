export type User = {
  id: string;
  name: string;
  email: string;
  type: "admin" | "staff" | "member";
};

export type Users = User[];
