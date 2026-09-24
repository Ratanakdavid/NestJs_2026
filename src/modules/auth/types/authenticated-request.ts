import type { Request } from 'express';
import type { User } from '../../users/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: User;
}
