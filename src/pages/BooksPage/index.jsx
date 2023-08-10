import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useToast } from 'components/ui/use-toast';
import { sleep } from 'lib/utils';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "components/ui/scroll-area"
import { Input } from 'components/ui/input'
import BookCard from "./BookCard";
import NewBook from "./NewBook";
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';

const BooksPage = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newBookOpen, setNewBookOpen] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      handleBookCreate();
    },
  });

  useEffect(() => {
    fetchBooksList();
  }, []);

  const fetchBooksList = async () => {
    try {
      await sleep(2000);

      fetch('./database/books.json')
        .then(response => response.json())
        .then(data => {
          setBooks(data);
          setTotalRecords(data.length);
        })
        .catch(error => console.log(error));
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

  const handleBookCreate = async () => {

  }

  if (loader) {
    return (
      <div className="h-full">
        <Loader size='md' />
      </div>
    );
  }

  return (
    <div>
      <div className="px-6 py-4 bg-white flex justify-between items-center border-b">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">Total records: {totalRecords}</p>
        </div>

        <Button onClick={() => setNewBookOpen(true)}>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div className="flex">
        <ScrollArea className="w-[250px] shadow-sm bg-white border-r p-4 shrink-0" >
          <h3 className='font-semibold text-xl'>Filters</h3>
        </ScrollArea>

        <div className="w-full py-4">
          <div className='mb-4 px-4'>
            <Input
              placeholder="Search here..."
              className='w-full p-4'
            />
          </div>

          <ScrollArea className='px-4' style={{ height: "calc(100vh - 170px)" }}>
            <div className="grid grid-cols-2 gap-4">
              {books.map(book => <BookCard book={book} key={book.id} />)}
            </div>
          </ScrollArea>
        </div>
      </div>

      <NewBook
        formik={formik}
        newBookOpen={newBookOpen}
        setNewBookOpen={setNewBookOpen}
      />
    </div>
  )
}

export default BooksPage;
