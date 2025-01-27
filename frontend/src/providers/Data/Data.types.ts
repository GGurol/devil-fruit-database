import { ChangeEvent } from "react";

export interface IFruitData {
  fruit_id: string;
  names: {
    romanized_names: { name: string; is_spoiler: boolean }[];
    translated_names: { name: string; is_spoiler: boolean }[];
  };
  types: { type: string; is_spoiler: boolean }[];
  abilities: {
    ability: string;
    awakened_ability: string | null;
  };
  users: {
    current_users:
      | {
          user: string;
          is_artificial: boolean;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
    previous_users:
      | {
          user: string;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
  };
  is_canon: boolean;
}

export interface INewFruitData {
  fruit_id: string;
  names: {
    romanized_names: { name: string; is_spoiler: boolean }[];
    translated_names: { name: string; is_spoiler: boolean }[];
  };
  types: { type: string; is_spoiler: boolean }[];
  ability: string;
  awakened_ability: string | null;
  users: {
    current_users:
      | {
          user: string;
          is_artificial: boolean;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
    previous_users:
      | {
          user: string;
          is_artificial: boolean;
          is_spoiler: boolean;
          awakening: { is_awakened: boolean; is_spoiler: boolean };
        }[]
      | null;
  };
  is_canon: boolean;
}

export interface IDataState {
  filteredFruitData: INewFruitData[] | null | undefined;
  resultsCount: number;
  isLoading: boolean;
  isError: boolean;
  showSpoilers: boolean;
  showNonCanon: boolean;
  searchState: boolean;
  searchQuery: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleShowSpoilers: () => void;
  handleShowNonCanon: () => void;
}
