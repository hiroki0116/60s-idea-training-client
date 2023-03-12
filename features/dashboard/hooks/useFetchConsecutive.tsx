import { useState, useEffect } from "react";
import { dashboardRepository } from "api-client/repositories/dashboard_repository";
import { APIWithoutAuth } from "api-client/api-client";

const useFetchConsecutive = (): {
  consecutiveDays: number;
  loadingForConsecutiveDays: boolean;
} => {
  const [consecutiveDays, setConsecutiveDays] = useState<number>();
  const [loadingForConsecutiveDays, setLoadingForConsecutiveDays] =
    useState(false);

  const getConsecutiveDays = async () => {
    try {
      setLoadingForConsecutiveDays(true);
      const result = await dashboardRepository.getConsecutiveDays();
      setConsecutiveDays(result);
    } catch (error: any) {
      await APIWithoutAuth.post(
        "/error-message",
        { message: error.message },
        { errorHandle: false }
      );
    } finally {
      setLoadingForConsecutiveDays(false);
    }
  };

  useEffect(() => {
    getConsecutiveDays();
  }, []);

  return { consecutiveDays, loadingForConsecutiveDays };
};

export default useFetchConsecutive;
