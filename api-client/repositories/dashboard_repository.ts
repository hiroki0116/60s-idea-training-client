import { API } from "api-client/api-client";
import { TotalSessions, WeeklyData } from "features/dashboard/types/dashboard";

type DashboardRepository = {
  getTotalSessionsAndIdeas: () => Promise<TotalSessions>;
  getTodaySessionsIdeas: () => Promise<TotalSessions>;
  getWeeklyRecords: () => Promise<WeeklyData>;
  getConsecutiveDays: () => Promise<number>;
};

const getTotalSessionsAndIdeas = async (): Promise<TotalSessions> => {
  const { data } = await API.get(`/ideas/total/all`, { errorHandle: false });
  return data.data[0];
};

const getTodaySessionsIdeas = async (): Promise<TotalSessions> => {
  const { data } = await API.get("/ideas/total/today", {
    errorHandle: false,
  });
  return data.data[0];
};

const getWeeklyRecords = async (): Promise<WeeklyData> => {
  const { data } = await API.get("/ideas/weekly", { errorHandle: false });
  return data.data;
};

const getConsecutiveDays = async (): Promise<number> => {
  const { data } = await API.get("/ideas/total/consecutive", {
    errorHandle: false,
  });
  return data.data;
};

export const dashboardRepository: DashboardRepository = {
  getTotalSessionsAndIdeas,
  getTodaySessionsIdeas,
  getWeeklyRecords,
  getConsecutiveDays,
};
