import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "components/ui/table";
import { useLocalStorage } from "lib/useLocalStorage";

export const TableRows = () => {
  let i = 1;
  let array = useLocalStorage('user');

  console.log(array);
  return array.map(item => <TableRow>
        <TableCell>{i++}</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
      </TableRow>);
}