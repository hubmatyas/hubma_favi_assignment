import { useState, useEffect } from 'react';

const useFetchAllProducts = <T extends {}>(url: string): [T | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, isLoading];
};

export default useFetchAllProducts;
