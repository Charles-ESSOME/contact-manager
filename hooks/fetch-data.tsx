import { useState, useEffect } from "react";

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit | any;
};

type UseApiReturn<T> = {
  res: {data: T | null, count?: number};
  error: string | null;
  isLoading: boolean;
  fetchData: () => Promise<void>;
};


export function useFetch<T>(url: string, options?: FetchOptions): UseApiReturn<T> {
  const [res, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api${url}`, {
        method: options?.method || 'GET', // Méthode par défaut : GET
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        body: options?.body || null,
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData()

  }, [url])



  return { isLoading, res, error, fetchData }

}