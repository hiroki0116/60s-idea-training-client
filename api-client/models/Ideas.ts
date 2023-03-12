import { IUser } from "./User";

export type IIdeas = {
  _id: string;
  topicTitle: string;
  category: string;
  ideas: string[];
  createdBy: IUser;
  viewed: boolean;
  isLiked: boolean;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};
