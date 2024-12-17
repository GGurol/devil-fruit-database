import { FC, Fragment } from "react";
import TableWrapper, {
  DataItem,
  DataList,
  DataText,
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
  TableThread,
} from "./Table.styled";
import { useDataContext } from "../../providers/Data/Data.context";
import { ITableProps } from "./Table.types";

const Table: FC<ITableProps> = ({ $alternate = false }) => {
  const { filteredFruitData, showSpoilers, isLoading } = useDataContext();

  // TODO: Implement better overall conditional rendering, whether that be skeletons or loading indicators

  return (
    <Fragment>
      {!isLoading ? (
        <TableContainer>
          <TableWrapper>
            <TableThread>
              <TableRow>
                <TableHeader>Devil Fruit</TableHeader>
                <TableHeader>English Translations</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Ability</TableHeader>
                <TableHeader>Current User(s)</TableHeader>
                <TableHeader>Previous User(s)</TableHeader>
                <TableHeader>Canon</TableHeader>
              </TableRow>
            </TableThread>
            <TableBody $alternate={$alternate}>
              {filteredFruitData?.map((fruit, index) => (
                <TableRow key={index}>
                  <TableData>
                    <DataList>
                      {fruit.romanized_names.map((rname, rnameIndex) => (
                        <DataItem key={rnameIndex}>
                          <DataText
                            $showSpoilers={showSpoilers}
                            $useSpoilerBlock={rname.is_spoiler}
                            $isArtificial={false}
                          >
                            {rname.name}
                          </DataText>
                        </DataItem>
                      ))}
                    </DataList>
                  </TableData>
                  <TableData>
                    <DataList>
                      {fruit.translated_names.map((tname, tnameIndex) => (
                        <DataItem key={tnameIndex}>
                          <DataText
                            $showSpoilers={showSpoilers}
                            $useSpoilerBlock={tname.is_spoiler}
                            $isArtificial={false}
                          >
                            {tname.name}
                          </DataText>
                        </DataItem>
                      ))}
                    </DataList>
                  </TableData>
                  <TableData>
                    <DataList>
                      {fruit.types.map((type, typeIndex) => (
                        <DataItem key={typeIndex}>
                          <DataText
                            $showSpoilers={showSpoilers}
                            $useSpoilerBlock={type.is_spoiler}
                            $isArtificial={false}
                          >
                            {type.type}
                          </DataText>
                        </DataItem>
                      ))}
                    </DataList>
                  </TableData>
                  <TableData>{fruit.ability}</TableData>

                  <TableData>
                    {fruit.users ? (
                      <DataList>
                        {fruit.users.filter((cuser) => cuser.is_current)
                          .length > 0
                          ? fruit.users
                              .filter((cuser) => cuser.is_current)
                              .map((cuser, cuserIndex) => (
                                <DataItem key={cuserIndex}>
                                  <DataText
                                    $showSpoilers={showSpoilers}
                                    $useSpoilerBlock={cuser.is_spoiler}
                                    $awakening={{
                                      $isAwakend: cuser.awakening.is_awakened,
                                      $isSpoiler: cuser.awakening.is_spoiler,
                                    }}
                                    $isArtificial={cuser.is_artificial}
                                    title={
                                      cuser.awakening.is_awakened
                                        ? "Awakened"
                                        : cuser.is_artificial
                                        ? "Artificial"
                                        : ""
                                    }
                                  >
                                    {cuser.user}
                                  </DataText>
                                </DataItem>
                              ))
                          : "None"}
                      </DataList>
                    ) : (
                      "None"
                    )}
                  </TableData>

                  <TableData>
                    {fruit.users ? (
                      <DataList>
                        {fruit.users.filter((puser) => !puser.is_current)
                          .length > 0
                          ? fruit.users
                              .filter((puser) => !puser.is_current)
                              .map((puser, puserIndex) => (
                                <DataItem key={puserIndex}>
                                  <DataText
                                    $showSpoilers={showSpoilers}
                                    $useSpoilerBlock={puser.is_spoiler}
                                    $awakening={{
                                      $isAwakend: puser.awakening.is_awakened,
                                      $isSpoiler: puser.awakening.is_spoiler,
                                    }}
                                    $isArtificial={puser.is_artificial}
                                    title={
                                      puser.awakening.is_awakened
                                        ? "Awakened"
                                        : puser.is_artificial
                                        ? "Artificial"
                                        : ""
                                    }
                                  >
                                    {puser.user}
                                  </DataText>
                                </DataItem>
                              ))
                          : "None"}
                      </DataList>
                    ) : (
                      "None"
                    )}
                  </TableData>

                  <TableData>
                    <p>{fruit.is_canon ? "Yes" : "No"}</p>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </TableWrapper>
        </TableContainer>
      ) : (
        "is loading"
      )}
    </Fragment>
  );
};

export default Table;
