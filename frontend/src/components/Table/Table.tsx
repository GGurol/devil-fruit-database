import { FC } from "react";
import TableWrapper, {
  TableBody,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
  TableThread,
} from "./Table.styled";

interface IFruitData {
  devilFruitName: string;
  type: string;
  ability: string;
  currentUser: string;
  previousUser: string;
}

const fruitData: IFruitData[] = [
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
  {
    devilFruitName: "Gomu Gomu no Mi",
    type: "Paramecia",
    ability: "Rubber powers",
    currentUser: "Monkey D. Luffy",
    previousUser: "None",
  },
  {
    devilFruitName: "Mera Mera no Mi",
    type: "Logia",
    ability: "Fire manipulation",
    currentUser: "Portgas D. Ace",
    previousUser: "None",
  },
  {
    devilFruitName: "Ito Ito no Mi",
    type: "Paramecia",
    ability: "String manipulation",
    currentUser: "Donquixote Doflamingo",
    previousUser: "None",
  },
];

const Table: FC = () => {
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
              <TableData>{fruit.currentUser}</TableData>
              <TableData>{fruit.previousUser}</TableData>
            </TableRow>
          ))}
        </TableBody>
      </TableWrapper>
    </TableContainer>
  );
};

export default Table;
