import { useState, useEffect } from "react";
import { API } from "api-client/api-client";

// this is generic fetch custom hooks
export function useFetcher<T>({
  url,
  initialState,
}: {
  url: string;
  initialState: T;
}) {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchAndSet = async () => {
    try {
      setLoading(true);
      const res = await API.get(url, { errorHandle: false });
      setData(res.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSet();
    // eslint-disable-next-line
  }, []);

  return { data, loading, error };
}
