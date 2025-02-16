import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IFilterProps } from "./Filters.types";
import {
  FilterActionsContainer,
  FilterActionsRight,
  FilterBottomContainer,
  FilterContentContainer,
  FiltersContainer,
  FilterSection,
  FilterSectionHeader,
  FilterSectionItems,
  FilterSectionsContainer,
  FiltersOverlay,
  FiltersPopoverContainer,
} from "./Filters.styled";

import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";

import { Divider } from "../Divider/Divider.styled";
import { useDataContext } from "../../providers/Data/Data.context";

const Filters: FC<IFilterProps> = ({ $isLandscape = true }) => {
  const {
    selectedTypeFilters: globalTypeFilters,
    selectedUserFilters: globalUserFilters,
    handleTypeFilter,
    handleUserFilter,
    handleResetFilters,
    handlePageChange,
    handleItemsPerPageChange,
  } = useDataContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [localSelectedTypeFilters, setLocalSelectedTypeFilters] =
    useState<string[]>(globalTypeFilters);
  const [localSelectedUserFilters, setLocalSelectedUserFilters] =
    useState<string[]>(globalUserFilters);

  const handleTypeCheckboxChange = useCallback((type: string) => {
    setLocalSelectedTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const handleUserCheckboxChange = useCallback((filter: string) => {
    setLocalSelectedUserFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }, []);

  const toggleFiltersState = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleApplyFilters = useCallback(() => {
    handleTypeFilter(localSelectedTypeFilters);
    handleUserFilter(localSelectedUserFilters);

    handlePageChange(1);
    handleItemsPerPageChange(25);

    // const popover = document.getElementById("filters-container");
    // if (popover) {
    //   popover.hidePopover();
    // }

    setIsOpen(false);
  }, [
    handleItemsPerPageChange,
    handlePageChange,
    handleTypeFilter,
    handleUserFilter,
    localSelectedTypeFilters,
    localSelectedUserFilters,
  ]);

  const handleCancel = useCallback(() => {
    handleTypeFilter(globalTypeFilters);
    handleUserFilter(globalUserFilters);

    // const popover = document.getElementById("filters-container");
    // if (popover) {
    //   popover.hidePopover();
    // }

    setIsOpen(false);
  }, [
    globalTypeFilters,
    globalUserFilters,
    handleTypeFilter,
    handleUserFilter,
  ]);

  useEffect(() => {
    setLocalSelectedTypeFilters(globalTypeFilters);
  }, [globalTypeFilters]);

  useEffect(() => {
    setLocalSelectedUserFilters(globalUserFilters);
  }, [globalUserFilters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filterContent = () => {
    return (
      <FilterContentContainer>
        <FilterSectionsContainer $isLandscape={$isLandscape}>
          <FilterSection>
            <FilterSectionHeader>Types</FilterSectionHeader>
            <FilterSectionItems>
              {/* Auto generate items, using fruit types */}
              <Checkbox
                id="type-1"
                name="type-1"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Zoan",
                }}
                checked={localSelectedTypeFilters.includes("Zoan")}
                $handleState={() => handleTypeCheckboxChange("Zoan")}
              />
              <Checkbox
                id="type-2"
                name="type-2"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Ancient Zoan",
                }}
                checked={localSelectedTypeFilters.includes("Ancient Zoan")}
                $handleState={() => handleTypeCheckboxChange("Ancient Zoan")}
              />
              <Checkbox
                id="type-3"
                name="type-3"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Mythical Zoan",
                }}
                checked={localSelectedTypeFilters.includes("Mythical Zoan")}
                $handleState={() => handleTypeCheckboxChange("Mythical Zoan")}
              />
              <Checkbox
                id="type-4"
                name="type-4"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Logia",
                }}
                checked={localSelectedTypeFilters.includes("Logia")}
                $handleState={() => handleTypeCheckboxChange("Logia")}
              />
              <Checkbox
                id="type-5"
                name="type-5"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Paramecia",
                }}
                checked={localSelectedTypeFilters.includes("Paramecia")}
                $handleState={() => handleTypeCheckboxChange("Paramecia")}
              />
              <Checkbox
                id="type-6"
                name="type-6"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Special Paramecia",
                }}
                checked={localSelectedTypeFilters.includes("Special Paramecia")}
                $handleState={() =>
                  handleTypeCheckboxChange("Special Paramecia")
                }
              />
              <Checkbox
                id="type-7"
                name="type-7"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Undetermined",
                }}
                checked={localSelectedTypeFilters.includes("Undetermined")}
                $handleState={() => handleTypeCheckboxChange("Undetermined")}
              />
            </FilterSectionItems>
          </FilterSection>
          <FilterSection>
            <FilterSectionHeader>User</FilterSectionHeader>
            <FilterSectionItems>
              {/* Auto generate items, using fruit types */}
              <Checkbox
                id="user-1"
                name="user-1"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Awakened",
                }}
                checked={localSelectedUserFilters.includes("Awakened")}
                $handleState={() => handleUserCheckboxChange("Awakened")}
              />
              <Checkbox
                id="user-2"
                name="user-2"
                $variant="AccentPrimary"
                $label={{
                  hasLabel: true,
                  ascendingLabel: false,
                  labelText: "Artificial",
                }}
                checked={localSelectedUserFilters.includes("Artificial")}
                $handleState={() => handleUserCheckboxChange("Artificial")}
              />
            </FilterSectionItems>
          </FilterSection>
        </FilterSectionsContainer>

        <FilterBottomContainer>
          <Divider />
          <FilterActionsContainer>
            <Button
              onClick={handleResetFilters}
              $variant={{ variantName: "Text" }}
            >
              Reset Filters
            </Button>
            <FilterActionsRight>
              <Button
                onClick={handleCancel}
                $variant={{ variantName: "Outline" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyFilters}
                $variant={{ variantName: "Solid" }}
                style={{ flex: $isLandscape ? "" : "1 0 0" }}
              >
                Apply Filters
              </Button>
            </FilterActionsRight>
          </FilterActionsContainer>
        </FilterBottomContainer>
      </FilterContentContainer>
    );
  };

  return (
    <FiltersContainer ref={containerRef}>
      <Button
        ref={buttonRef}
        onClick={toggleFiltersState}
        $variant={{
          variantName: "IconOutline",
        }}
        $icon={{
          hasIcon: true,
          iconStyle: {
            iconName: "Adjust",
          },
        }}
      />

      {isOpen && (
        <FiltersPopoverContainer id="filters-container">
          {filterContent()}
        </FiltersPopoverContainer>
      )}

      {isOpen && <FiltersOverlay onClick={handleCancel} />}
    </FiltersContainer>
  );
};

export default Filters;
