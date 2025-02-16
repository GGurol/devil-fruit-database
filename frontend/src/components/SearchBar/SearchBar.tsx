import { FC } from "react";
import Textfield from "../Textfield/Textfield";
import { useDataContext } from "../../providers/Data/Data.context";

const SearchBar: FC = () => {
  const { searchQuery, handleSearch } = useDataContext();

  return (
    <Textfield
      id="search-bar"
      placeholder="Search"
      value={searchQuery}
      $icon={{
        hasIcon: true,
        iconStyle: {
          iconName: "Search",
          fontSize: "20px",
        },
      }}
      handleInputChange={handleSearch}
    />
  );
};

export default SearchBar;
