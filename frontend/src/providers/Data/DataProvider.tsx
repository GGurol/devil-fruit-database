import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useQuery } from "react-query";

import { DataContext } from "./Data.context";
import { INewFruitData } from "./Data.types";

// const BASE_URL = "https://devil-fruit-database-crs-qehiib5lra-ue.a.run.app/api";
const DEV_BASE_URL = "http://0.0.0.0:8000/api";

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showSpoilers, setShowSpoilers] = useState<boolean>(() => {
    const currState = localStorage.getItem("spoilers");

    if (currState === "true") {
      return true;
    }

    if (currState === "false") {
      return false;
    }

    return false;
  });

  const [showNonCanon, setShowNonCanon] = useState<boolean>(() => {
    const currState = localStorage.getItem("canon");

    if (currState === "true") {
      return true;
    }

    if (currState === "false") {
      return false;
    }

    return true;
  });

  useEffect(() => {
    localStorage.setItem("spoilers", String(showSpoilers));
    localStorage.setItem("canon", String(showNonCanon));
  }, [showNonCanon, showSpoilers]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchState, setSearchState] = useState<boolean>(true);

  // TODO: Implement search functionality with backend api call, though frontend might be faster, will need to test

  const {
    data: devilFruits,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["devilFruits"],
    queryFn: async () => {
      const response = await fetch(`${DEV_BASE_URL}/devil-fruits/`, {});
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      return await response.json();
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const filteredFruitData = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];

    let filteredData = devilFruits;

    // Filter by 'canon' status
    if (!showNonCanon) {
      filteredData = filteredData.filter(
        (fruit: INewFruitData) => fruit.is_canon
      );
    }

    // Filter by search query
    if (searchQuery) {
      filteredData = filteredData.filter((fruit: INewFruitData) => {
        const searchableFields = [
          ...fruit.names.romanized_names.map((rname) => rname.name),
          ...fruit.names.translated_names.map((tname) => tname.name),
          ...(fruit.users.current_users?.map((cuser) => cuser.user) || []),
          ...(fruit.users.previous_users?.map((puser) => puser.user) || []),
        ].map((field) => field?.toLowerCase());

        return searchableFields.some((field) => field?.includes(searchQuery));
      });
    }

    setSearchState(filteredData.length > 0);

    return filteredData;
  }, [devilFruits, isError, isLoading, searchQuery, showNonCanon]);

  const handleShowSpoilers = useCallback(() => {
    setShowSpoilers(!showSpoilers);
  }, [showSpoilers]);

  const handleShowNonCanon = useCallback(() => {
    setShowNonCanon(!showNonCanon);
  }, [showNonCanon]);

  // If planning on updating to backend search, debounce search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const value = {
    filteredFruitData,
    showSpoilers,
    showNonCanon,
    isLoading,
    isError,
    searchState,
    searchQuery,
    handleSearch,
    handleShowSpoilers,
    handleShowNonCanon,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
