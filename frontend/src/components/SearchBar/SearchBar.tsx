import { FC } from "react";
import Textfield from "../Textfield/Textfield";
import { useDataContext } from "../../providers/Data/Data.context";

const SearchBar: FC = () => {
  const { handleSearch } = useDataContext();

  return (
    <Textfield
      placeholder="Search"
      $icon={{
        hasIcon: true,
        iconStyle: {
          iconName: "Search",
          fontSize: "20px",
        },
      }}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
