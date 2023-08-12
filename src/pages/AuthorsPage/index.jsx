import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import * as dayjs from "dayjs";
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
} from "components/ui/table";
import { getAuthors } from "apis/authors";

const AuthorsPage = () => {
  const relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

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
        variant: "destructive",
        title: error.data.message,
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
      <div className="px-6 py-4 bg-white flex justify-between items-center border-b shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">Authors</h2>

        <Button size='sm'>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div className="px-6 mt-6">
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
    </div>
  )
}

export default AuthorsPage;
