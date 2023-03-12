import { useState, useEffect } from "react";
import { dashboardRepository } from "api-client/repositories/dashboard_repository";
import { APIWithoutAuth } from "api-client/api-client";
import { TotalSessions } from "../types/dashboard";

const useFetchTotalSessions = (): {
  totalIdeasSessions: TotalSessions;
  loadingForTotal: boolean;
} => {
  const [totalIdeasSessions, setTotalIdeasSessions] = useState<TotalSessions>();
  const [loadingForTotal, setLoadingForTotal] = useState<boolean>(false);

  const getSessionsIdeasCount = async () => {
    try {
      setLoadingForTotal(true);
      const result = await dashboardRepository.getTotalSessionsAndIdeas();
      setTotalIdeasSessions(result);
    } catch (error: any) {
      await APIWithoutAuth.post(
        "/error-message",
        { message: error.message },
        { errorHandle: false }
      );
    } finally {
      setLoadingForTotal(false);
    }
  };

  useEffect(() => {
    getSessionsIdeasCount();
  }, []);

  return { totalIdeasSessions, loadingForTotal };
};

export default useFetchTotalSessions;
