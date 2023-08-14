import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import * as dayjs from 'dayjs';
import { useFormik } from 'formik';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button';
import {
  PlusIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  TrashIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderRow,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import { getAuthors, createAuthor, destroyAuthor } from 'apis/authors';
import NewAuthor from './NewAuthor';
import DeleteAuthor from './DeleteAuthor';
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { Label } from '@radix-ui/react-label';
import EmptyBox from 'components/EmptyBox';

const AuthorsPage = () => {
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newAuthorOpen, setNewAuthorOpen] = useState(false);
  const [deleteAuthorOpen, setDeleteAuthorOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState({});
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
      toast({ variant: 'destructive', title: error.message });
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
      formik.resetForm();
      setNewAuthorOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
    } finally {
      setBtnLoader(false);
    }
  }

  const handleDeleteBtnClick = (data) => {
    setSelectedAuthor(data);
    setDeleteAuthorOpen(true);
  }

  const handleNewAuthorDialogClose = () => {
    setNewAuthorOpen(false);
    formik.resetForm();
  }

  const deleteAuthor = async () => {
    try {
      setBtnLoader(true);
      await destroyAuthor(selectedAuthor?.id);
      toast({ title: 'Author has been successfully deleted.' });
      setSelectedAuthor({});
      setDeleteAuthorOpen(false);
      await fetchAuthors();
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
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

        {totalRecords > 0 ? (
          <Table>
            <TableHeader>
              <TableHeaderRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableHeaderRow>
            </TableHeader>

            <TableBody>
              {authors.map(author => {
                return (
                  <TableRow key={author.id}>
                    <TableCell>{author.id}</TableCell>
                    <TableCell>{author.name}</TableCell>
                    <TableCell>{author.active ? <CheckCircledIcon className='text-green-800' /> : <CrossCircledIcon className='text-red-800' />}</TableCell>
                    <TableCell>{dayjs(author.created_at).fromNow()}</TableCell>
                    <TableCell>
                      <Button size="smallIcon" className="mr-3">
                        <Pencil2Icon className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="smallIcon" onClick={() => handleDeleteBtnClick(author)}>
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <EmptyBox />
        )}
      </div>

      <NewAuthor
        formik={formik}
        newAuthorOpen={newAuthorOpen}
        handleNewAuthorDialogClose={handleNewAuthorDialogClose}
        btnLoader={btnLoader}
      />

      <DeleteAuthor
        selectedAuthor={selectedAuthor}
        deleteAuthorOpen={deleteAuthorOpen}
        setDeleteAuthorOpen={setDeleteAuthorOpen}
        btnLoader={btnLoader}
        deleteAuthor={deleteAuthor}
      />
    </div>
  )
}

export default AuthorsPage;
