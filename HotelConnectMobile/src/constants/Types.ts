import {EUserRole, Status} from './Enums';

export type RoomList = {
  id: number;
  name: string;
  floor: number;
  number: number;
  status: Status;
  type: undefined;
};

export type Task = {
  id: number;
  name: string;
  description: string;
};
export type AssignedTask = {
  id: number;
  name: string;
  userId: number;
  roomId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
};

export type NewUser = {
  username: string;
  password: string;
  password2: string;
  email: string;
  role: number;
};

export type UpdateUser = {
  username: string;
  email: string;
  role: EUserRole;
  is_active: boolean;
  user_id: string;
};
