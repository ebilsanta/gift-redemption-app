import { useEffect, useState } from 'react';
import staffAPI from '../../api/staffAPI';

const useHome = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [data, setData] = useState<Staff[]>([]);
  const searchCache: Map<string, Staff[]> = new Map();

  useEffect(() => {
    const searchForStaff = async (query: string) => {
      if (searchCache.has(query)) {
        setData(searchCache.get(query)!);
        return; 
      }
      const { data } = await staffAPI.searchForStaff(query.toUpperCase(), 0, 10, false);
      setData(data);
      searchCache.set(query, data);
    }

    if (searchQuery.length < 4) {
      return;
    }

    const timer = setTimeout(() => {
      searchForStaff(searchQuery);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchQuery])

  return {
    data,
    setSearchQuery,
  };
}

export default useHome;