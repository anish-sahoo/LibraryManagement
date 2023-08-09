import {
    TableCell,
    TableRow,
} from "components/ui/table";
import { useEffect, useState } from "react";

export const TableRows = () => {
  const [users, setUsers] = useState([]); 
  let i = 1;

  useEffect(() => {
    fetch('./database/users.json')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  return users.map(item => <TableRow key={i}>
        <TableCell>{i++}</TableCell>
        <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{0}</TableCell>
        <TableCell>{"Student"}</TableCell>
        <TableCell className="text-right">0</TableCell>
      </TableRow>);
}

