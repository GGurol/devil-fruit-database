import { FC } from "react";
import TableWrapper, {
  SpoilerContainer,
  SpoilerContent,
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
  TableThread,
  UserItem,
  UserList,
} from "./Table.styled";
import { useDataContext } from "../../providers/Data/Data.context";

interface IFruitData {
  devilFruitName: string;
  type: string;
  ability: string;
  users: {
    current_users:
      | [
          {
            user: string;
            is_artificial: boolean;
            is_spoiler: boolean;
          }
        ]
      | null;
    previous_users:
      | [
          {
            user: string;
            is_spoiler: boolean;
          }
        ]
      | null;
  };
}

const fruitData: IFruitData[] = [
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    users: {
      current_users: [
        {
          user: "Monkey D. Luffy",
          is_artificial: false,
          is_spoiler: false,
        },
      ],
      previous_users: [
        {
          user: "Joy Boy",
          is_spoiler: true,
        },
      ],
    },
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    users: {
      current_users: [
        {
          user: "Sabo",
          is_artificial: false,
          is_spoiler: true,
        },
      ],
      previous_users: [
        {
          user: "Portgas D. Ace",
          is_spoiler: true,
        },
      ],
    },
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    users: {
      current_users: [
        {
          user: "Donquixote Doflamingo",
          is_artificial: false,
          is_spoiler: false,
        },
      ],
      previous_users: null,
    },
  },
  {
    devilFruitName: "Hito Hito no Mi, Model: Nika",
    type: "Mythical Zoan",
    ability: "Rubber powers",
    users: {
      current_users: [
        {
          user: "Monkey D. Luffy",
          is_artificial: false,
          is_spoiler: true,
        },
      ],
      previous_users: [
        {
          user: "Joy Boy",
          is_spoiler: false,
        },
      ],
    },
  },
];

const Table: FC = () => {
  const { showSpoilers } = useDataContext();

  return (
    <TableContainer>
      <TableWrapper>
        <TableThread>
          <TableRow>
            <TableHeader>Devil Fruit Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Ability</TableHeader>
            <TableHeader>Current User(s)</TableHeader>
            <TableHeader>Previous User(s)</TableHeader>
          </TableRow>
        </TableThread>
        <TableBody>
          {fruitData.map((fruit, index) => (
            <TableRow key={index}>
              <TableData>{fruit.devilFruitName}</TableData>
              <TableData>{fruit.type}</TableData>
              <TableData>{fruit.ability}</TableData>

              <TableData>
                {fruit.users.current_users ? (
                  <UserList className="user-list">
                    {fruit.users.current_users.map((user, userIndex) => (
                      <UserItem key={userIndex} className="user-item">
                        {user.is_spoiler ? (
                          <SpoilerContainer
                            className="spoiler-container"
                            $showSpoilers={showSpoilers}
                          >
                            <SpoilerContent className="spoiler-content">
                              {user.user}
                            </SpoilerContent>
                          </SpoilerContainer>
                        ) : (
                          user.user
                        )}
                      </UserItem>
                    ))}
                  </UserList>
                ) : (
                  "N/A"
                )}
              </TableData>

              <TableData>
                {fruit.users.previous_users ? (
                  <UserList className="user-list">
                    {fruit.users.previous_users.map((user, userIndex) => (
                      <UserItem key={userIndex} className="user-item">
                        {user.is_spoiler ? (
                          <SpoilerContainer
                            className="spoiler-container"
                            $showSpoilers={showSpoilers}
                          >
                            <SpoilerContent className="spoiler-content">
                              {user.user}
                            </SpoilerContent>
                          </SpoilerContainer>
                        ) : (
                          user.user
                        )}
                      </UserItem>
                    ))}
                  </UserList>
                ) : (
                  "N/A"
                )}
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;
