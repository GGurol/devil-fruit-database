import {
  ChangeEvent,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useQuery } from "react-query";

import { DataContext } from "./Data.context";
import { INewFruitData } from "./Data.types";

// const BASE_URL = "https://devil-fruit-database-crs-qehiib5lra-ue.a.run.app/api";
const DEV_BASE_URL = "http://localhost:8000/api";

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const filteredDevilFruitsCount = useRef<number>(0);

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

  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);
  const [selectedUserFilters, setSelectedUserFilters] = useState<string[]>([]);

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

  const handleTypeFilter = useCallback((types: string[]) => {
    setSelectedTypeFilters(types);
  }, []);

  const handleUserFilter = useCallback((filters: string[]) => {
    setSelectedUserFilters(filters);
  }, []);

  const filteredFruitData = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];

    let filteredData: INewFruitData[] = devilFruits;

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

    if (selectedTypeFilters.length > 0) {
      filteredData = filteredData.filter((fruit) =>
        fruit.types.some((type) => selectedTypeFilters.includes(type.type))
      );
    }

    if (selectedUserFilters.length > 0) {
      filteredData = filteredData.filter((fruit) => {
        const currentUsers = fruit.users.current_users || [];
        const previousUsers = fruit.users.previous_users || [];
        const allUsers = [...currentUsers, ...previousUsers];

        return selectedUserFilters.every((filter) => {
          if (filter === "Artificial") {
            return allUsers.some((user) => user.is_artificial);
          }

          if (filter === "Awakened") {
            return allUsers.some((user) => user.awakening?.is_awakened);
          }

          return false;
        });
      });
    }

    setSearchState(filteredData.length > 0);

    filteredDevilFruitsCount.current = filteredData.length;

    return filteredData;
  }, [
    devilFruits,
    isError,
    isLoading,
    searchQuery,
    selectedTypeFilters,
    selectedUserFilters,
    showNonCanon,
  ]);

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
    resultsCount: filteredDevilFruitsCount.current,
    showSpoilers,
    showNonCanon,
    isLoading,
    isError,
    searchState,
    searchQuery,
    selectedTypeFilters,
    selectedUserFilters,
    handleSearch,
    handleShowSpoilers,
    handleShowNonCanon,
    handleTypeFilter,
    handleUserFilter,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
