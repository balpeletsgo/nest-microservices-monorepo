import { User } from 'generated/prisma';

export interface UserRequest extends Request {
  user: User;
}
