import { FC, useCallback, useEffect, useMemo, useState } from "react";

import {
  PaginationContainer,
  PaginationControls,
  PaginationText,
} from "./Pagination.styled";
import { IPaginationProps } from "./Pagination.types";

import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import { useDataContext } from "../../providers/Data/Data.context";

const Pagination: FC<IPaginationProps> = ({ results, options }) => {
  const {
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = useDataContext();

  const [minRange, setMinRange] = useState<number>(1);
  const [maxRange, setMaxRange] = useState<number>(itemsPerPage);

  // Memoized derived values
  const shouldHideDropdown = useMemo(
    () => results <= Math.min(...options),
    [results, options]
  );

  const shouldHidePagination = useMemo(
    () => results <= itemsPerPage,
    [results, itemsPerPage]
  );

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }, [currentPage, handlePageChange]);

  const handleNextPage = useCallback(() => {
    if (currentPage < Math.ceil(results / itemsPerPage)) {
      handlePageChange(currentPage + 1);
    }
  }, [currentPage, handlePageChange, itemsPerPage, results]);

  const handleDropdownChange = useCallback(
    (value: number) => {
      handleItemsPerPageChange(value);
    },
    [handleItemsPerPageChange]
  );

  useEffect(() => {
    const newMaxRange = Math.min(currentPage * itemsPerPage, results);

    setMinRange((currentPage - 1) * itemsPerPage + 1);
    setMaxRange(newMaxRange);
  }, [currentPage, itemsPerPage, minRange, results]);

  if (results === 0) {
    return null;
  }

  return (
    <PaginationContainer>
      {!shouldHideDropdown && (
        <Dropdown
          options={options}
          selectedValue={itemsPerPage}
          onChange={handleDropdownChange}
        />
      )}

      {!shouldHidePagination && (
        <PaginationControls>
          <PaginationText>
            {minRange} - {maxRange} of {results}
          </PaginationText>

          <Button
            onClick={handlePreviousPage}
            $variant={{ variantName: "IconOutline" }}
            $icon={{
              hasIcon: true,
              iconStyle: {
                iconName: "CaretLeft",
              },
            }}
            disabled={minRange === 1}
            aria-label="Previous Page"
          />
          <Button
            onClick={handleNextPage}
            $variant={{ variantName: "IconOutline" }}
            $icon={{
              hasIcon: true,
              iconStyle: {
                iconName: "CaretRight",
              },
            }}
            disabled={currentPage >= Math.ceil(results / itemsPerPage)}
            aria-label="Next Page"
          />
        </PaginationControls>
      )}

      {shouldHidePagination && (
        <PaginationText>Showing all {results} results</PaginationText>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
