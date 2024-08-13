import { FC, PropsWithChildren, useState } from "react";
import { DataContext } from "./Data.context";

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showSpoilers, setShowSpoilers] = useState<boolean>(false);
  const [showNonCanon, setShowNonCanon] = useState<boolean>(true);

  const handleShowSpoilers = () => {
    setShowSpoilers(!showSpoilers);
  };

  const handleShowNonCanon = () => {
    setShowNonCanon(!showNonCanon);
  };

  const value = {
    showSpoilers,
    showNonCanon,
    handleShowSpoilers,
    handleShowNonCanon,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
