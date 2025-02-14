/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { IFilterProps } from "./Filters.types";
import {
  FilterActionsContainer,
  FilterBottomContainer,
  FilterContentContainer,
  FiltersContainer,
  FilterSection,
  FilterSectionHeader,
  FilterSectionItems,
  FilterSectionsContainer,
  FiltersMobileContainer,
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
    handlePageChange,
    handleItemsPerPageChange,
  } = useDataContext();

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

    const popover = document.getElementById("filters-container");
    if (popover) {
      popover.hidePopover();
    }

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

    const popover = document.getElementById("filters-container");
    if (popover) {
      popover.hidePopover();
    }

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

  const filterContent = () => {
    return (
      <FilterContentContainer>
        <FilterSectionsContainer $isLandscape={$isLandscape}>
          <FilterSection>
            <FilterSectionHeader>Types</FilterSectionHeader>
            <FilterSectionItems>
              {/* Auto generate items, using fruit types */}
              <Checkbox
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
            <Button onClick={handleCancel} $variant={{ variantName: "Text" }}>
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              $variant={{ variantName: "Solid" }}
              style={{ flex: $isLandscape ? "" : "1 0 0" }}
            >
              Apply Filters
            </Button>
          </FilterActionsContainer>
        </FilterBottomContainer>
      </FilterContentContainer>
    );
  };

  return (
    <FiltersContainer>
      <Button
        ref={buttonRef}
        onClick={toggleFiltersState}
        popovertarget="filters-container"
        $variant={{
          variantName: "IconOutline",
        }}
        $icon={{
          hasIcon: true,
          iconStyle: {
            iconName: "Adjust",
          },
        }}
        style={{ anchorName: "--filters" }}
      />

      <FiltersPopoverContainer popover="auto" id="filters-container">
        {filterContent()}
      </FiltersPopoverContainer>

      {isOpen && (
        <FiltersOverlay onClick={handleCancel}>
          <FiltersMobileContainer
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              event.stopPropagation()
            }
          >
            {filterContent()}
          </FiltersMobileContainer>
        </FiltersOverlay>
      )}
    </FiltersContainer>
  );
};

export default Filters;
