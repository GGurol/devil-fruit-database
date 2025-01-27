import { FC, useCallback, useEffect, useMemo, useState } from "react";

import {
  PaginationContainer,
  PaginationControls,
  PaginationText,
} from "./Pagination.styled";
import { IPaginationProps } from "./Pagination.types";

import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

const Pagination: FC<IPaginationProps> = ({ results, options }) => {
  const [dropdownValue, setDropdownValue] = useState<number>(options[0]);
  const [minRange, setMinRange] = useState<number>(1);
  const [maxRange, setMaxRange] = useState<number>(dropdownValue);

  // Memoized derived values
  const shouldHideDropdown = useMemo(
    () => results <= Math.min(...options),
    [results, options]
  );

  const shouldHidePagination = useMemo(
    () => results <= dropdownValue,
    [results, dropdownValue]
  );

  const handlePreviousPage = useCallback(() => {
    if (minRange > 1) {
      setMinRange((prev) => Math.max(prev - dropdownValue, 1));
    }
  }, [dropdownValue, minRange]);

  const handleNextPage = useCallback(() => {
    if (maxRange < results) {
      setMinRange((prev) => prev + dropdownValue);
    }
  }, [dropdownValue, maxRange, results]);

  const handleDropdownChange = useCallback((value: number) => {
    setDropdownValue(value);

    // Reset to the first page when the page size changes
    setMinRange(1);
  }, []);

  useEffect(() => {
    const newMaxRange = Math.min(minRange + dropdownValue - 1, results);

    setMaxRange(newMaxRange);
  }, [dropdownValue, minRange, results]);

  if (results === 0) {
    return null;
  }

  return (
    <PaginationContainer>
      {!shouldHideDropdown && (
        <Dropdown options={options} onChange={handleDropdownChange} />
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
            disabled={maxRange >= results}
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
