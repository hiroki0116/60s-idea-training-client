import { useState, useEffect } from "react";
import { dashboardRepository } from "api-client/repositories/dashboard_repository";
import { APIWithoutAuth } from "api-client/api-client";
import { WeeklyData } from "../types/dashboard";

const useFetchWeekly = (): {
  weeklyData: WeeklyData;
  loading: boolean;
} => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData>();
  const [loading, setLoading] = useState<boolean>(false);

  const getWeeklyData = async () => {
    try {
      setLoading(true);
      const result = await dashboardRepository.getWeeklyRecords();
      setWeeklyData(result);
    } catch (error: any) {
      await APIWithoutAuth.post(
        "/error-message",
        { message: error.message },
        { errorHandle: false }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeeklyData();
  }, []);

  return { weeklyData, loading };
};

export default useFetchWeekly;
