import { users } from "../../../mockData";

export default function handler(req: any, res: any) {
  res.status(200).send(users);
}
