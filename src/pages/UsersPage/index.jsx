import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import { sleep } from 'lib/utils';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";


const UsersPage = () => {
  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      await sleep(2000);

      fetch('./database/users.json')
        .then(response => {
          return response.json();
        }).then(data => {
          setUsers(data);
          setTotalRecords(data.length);
        }).catch((e) => {
          console.log(e.message);
        });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Please try again after some time.",
      });
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return (
      <div className="h-full">
        <Loader size='md' />
      </div>
    );
  }

  return (
    <div className='bg-white min-h-full'>
      <div className="px-6 py-4 bg-white flex justify-between items-center border-b">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Total records: {totalRecords}</p>
        </div>

        <Button>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div className="px-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Books Due</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Books Issued</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>0</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UsersPage;
