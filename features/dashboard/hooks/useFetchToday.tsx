import { useState, useEffect } from "react";
import { dashboardRepository } from "api-client/repositories/dashboard_repository";
import { APIWithoutAuth } from "api-client/api-client";

const useFetchToday = (): {
  todayIdeas: number;
  todaySessions: number;
  loadingForToday: boolean;
} => {
  const [todayIdeas, setTodayIdeas] = useState<number>();
  const [todaySessions, setTodaySessions] = useState<number>();
  const [loadingForToday, setLoadingForToday] = useState<boolean>(false);

  const getTodayData = async () => {
    try {
      setLoadingForToday(true);
      const result = await dashboardRepository.getTodaySessionsIdeas();
      setTodayIdeas(result?.totalIdeas);
      setTodaySessions(result?.totalSessions);
    } catch (error: any) {
      await APIWithoutAuth.post(
        "/error-message",
        { message: error.message },
        { errorHandle: false }
      );
    } finally {
      setLoadingForToday(false);
    }
  };

  useEffect(() => {
    getTodayData();
  }, []);

  return { todayIdeas, todaySessions, loadingForToday };
};

export default useFetchToday;
