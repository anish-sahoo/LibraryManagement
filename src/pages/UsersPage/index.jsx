import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import { sleep } from 'lib/utils';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { TableRows } from 'components/TableRows';


const UsersPage = () => {
  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);

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
    <div className="bg-white p-6 h-full">
      <div className="flex justify-between items-center mb-16">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Total records: 500</p>
        </div>

        <Button>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <TableRows/>
          </TableBody>
        
        </Table>
      </div>

      <hr />
    </div>
  )
}

export default UsersPage;
