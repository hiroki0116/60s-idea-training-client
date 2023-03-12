export type TotalSessions = {
  totalIdeas: number;
  totalSessions: number;
  _id: null;
} | null;

export type WeeklyIdeasSessions = {
  _id: string;
  totalIdeas: number;
  totalSessions: number;
};

export type WeeklyData = {
  weeklyRecords: WeeklyIdeasSessions[];
  lastMonday: Date;
} | null;
