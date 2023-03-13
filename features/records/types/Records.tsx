import { IIdeas } from "api-client/models/Ideas";
import { Dayjs } from "dayjs";

export type SearchReqBody = {
  searchInput: string;
  category: string;
  createdAtFrom: string;
  createdAtTo: string;
  current: number;
  pageSize: number;
  sortByRecent: boolean;
  isLiked: boolean;
};
