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
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { createUser, getUsers } from 'apis/users';
import { useFormik } from 'formik';
import NewUser from './NewUser';

const UsersPage = () => {
  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newUserOpen, setNewUserOpen] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      handleUserCreate();
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserCreate = () => {
    console.log(formik.values);
    try {
      //make this async
      // await createUser({
      //   name: formik.values.name,
      //   email: formik.values.email,
      //   user_type: formik.values.user_type,
      // });
      setNewUserOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
    } finally {
      formik.resetForm();
    }
  }

  const fetchUsers = async () => {
    try {
      await sleep(1000);
      const response = await getUsers();
      console.log(response.data);
      setUsers(response.data);
      setTotalRecords(response.data.length); 
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: error.response.message });
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

        <Button onClick={() => setNewUserOpen(true)}>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div className="px-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.user_type}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <NewUser
        formik={formik}
        newUserOpen={newUserOpen}
        setNewUserOpen={setNewUserOpen}
      />
    </div>
  )
}

export default UsersPage;
