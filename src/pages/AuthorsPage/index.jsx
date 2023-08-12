import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import * as dayjs from 'dayjs';
import { useFormik } from 'formik';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button';
import { PlusIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderRow,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { getAuthors, createAuthor } from 'apis/authors';
import NewAuthor from './NewAuthor';
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { Label } from '@radix-ui/react-label';

const AuthorsPage = () => {
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newAuthorOpen, setNewAuthorOpen] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      handleAuthorCreate();
    },
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await getAuthors();
      setAuthors(response.data);
      setTotalRecords(response.data.length);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: error.data.message,
      });
    } finally {
      setLoader(false);
    }
  }

  const handleAuthorCreate = async () => {
    try {
      setBtnLoader(true);
      await createAuthor(formik.values);
      toast({ title: 'Author has been successfully created.' });
      await fetchAuthors();
      setNewAuthorOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: error.data.message,
      });
    } finally {
      setBtnLoader(false);
    }
  }

  if (loader) {
    return (
      <div className='h-full'>
        <Loader size='md' />
      </div>
    );
  }

  return (
    <div className='bg-white min-h-full'>
      <div className='px-6 py-4 bg-white flex justify-between items-center border-b shadow-sm'>
        <h2 className='text-xl font-bold tracking-tight'>Authors</h2>

        <Button size='sm' onClick={() => setNewAuthorOpen(true)}>
          <PlusIcon className='mr-1' /> Add new
        </Button>
      </div>

      <div className='px-6 mt-6'>
        <div className='flex justify-between items-center mb-6'>
          <Label className='font-bold tracking-wide'>Total records: {totalRecords}</Label>
        </div>

        <Table>
          <TableHeader>
            <TableHeaderRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Created At</TableHead>
            </TableHeaderRow>
          </TableHeader>

          <TableBody>
            {authors.map(author => {
              return (
                <TableRow key={author.id}>
                  <TableCell>{author.id}</TableCell>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>{author.active ? <CheckCircledIcon /> : <CrossCircledIcon />}</TableCell>
                  <TableCell>{dayjs(author.created_at).fromNow()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <NewAuthor
        formik={formik}
        newAuthorOpen={newAuthorOpen}
        setNewAuthorOpen={setNewAuthorOpen}
        btnLoader={btnLoader}
      />
    </div>
  )
}

export default AuthorsPage;
