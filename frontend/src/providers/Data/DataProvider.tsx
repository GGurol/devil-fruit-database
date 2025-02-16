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

const BASE_URL = "https://devil-fruit-database-crs-qehiib5lra-ue.a.run.app";
// const DEV_BASE_URL = "http://localhost:8000";

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  // TODO: Implement search functionality with backend api call, though frontend might be faster, will need to test

  const [totalItems, setTotalItems] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchState, setSearchState] = useState<boolean>(true);

  const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>([]);
  const [selectedUserFilters, setSelectedUserFilters] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  const [allDevilFruits, setAllDevilFruits] = useState<INewFruitData[]>([]);

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

  const { isLoading, isError } = useQuery({
    queryKey: ["devilFruits"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/devil-fruits/`, {});
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      return await response.json();
    },
    staleTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    onSuccess: (data) => {
      setAllDevilFruits(data);
    },
  });

  const handleTypeFilter = useCallback((types: string[]) => {
    setSelectedTypeFilters(types);
  }, []);

  const handleUserFilter = useCallback((filters: string[]) => {
    setSelectedUserFilters(filters);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedTypeFilters([]);
    setSelectedUserFilters([]);
  }, []);

  const filteredFruitData = useMemo(() => {
    if (isLoading) return [];
    if (isError) return [];

    let filteredData: INewFruitData[] = allDevilFruits;

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

    setTotalItems(filteredData.length);
    setSearchState(filteredData.length > 0);

    return filteredData;
  }, [
    allDevilFruits,
    isError,
    isLoading,
    searchQuery,
    selectedTypeFilters,
    selectedUserFilters,
    showNonCanon,
  ]);

  const paginatedFruitData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredFruitData.slice(startIndex, endIndex);
  }, [currentPage, filteredFruitData, itemsPerPage]);

  const itemsPerPageOptions = useMemo(() => {
    if (totalItems <= 25) return [10, 25];
    if (totalItems <= 50) return [25, 50];
    if (totalItems <= 100) return [25, 50, 100];
    return [25, 50, 75, 100];
  }, [totalItems]);

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

    setCurrentPage(1);

    // TODO: reset filters on search?
    // setSelectedTypeFilters([]);
    // setSelectedUserFilters([]);
  };

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }, []);

  const value = {
    filteredFruitData: paginatedFruitData,
    totalItems,
    showSpoilers,
    showNonCanon,
    isLoading,
    isError,
    searchState,
    searchQuery,
    selectedTypeFilters,
    selectedUserFilters,
    currentPage,
    itemsPerPage,
    itemsPerPageOptions,
    handleSearch,
    handleShowSpoilers,
    handleShowNonCanon,
    handleTypeFilter,
    handleUserFilter,
    handleResetFilters,
    handlePageChange,
    handleItemsPerPageChange,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
