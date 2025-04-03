
import { useState, useEffect, useCallback, useRef } from "react";

interface UseRealTimeDataOptions {
  fetchFn: () => any;
  initialData?: any;
  interval?: number;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useRealTimeData<T>({
  fetchFn,
  initialData = null,
  interval = 10000, // Default 10 seconds
  enabled = true,
  onSuccess,
  onError,
}: UseRealTimeDataOptions) {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const previousDataRef = useRef<T | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    try {
      const result = await fetchFn();

      // Only update state if data actually changed
      const hasChanged = JSON.stringify(result) !== JSON.stringify(previousDataRef.current);
      
      if (hasChanged) {
        setData(result);
        previousDataRef.current = result;
        setLastUpdated(new Date());
        if (onSuccess) onSuccess(result);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      if (onError) onError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn, enabled, onSuccess, onError]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling interval if enabled
    if (enabled && interval > 0) {
      const intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }
    
    return undefined;
  }, [fetchData, interval, enabled]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh,
  };
}
