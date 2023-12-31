import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useToast } from 'components/ui/use-toast';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "components/ui/scroll-area"
import { Input } from 'components/ui/input'
import BookCard from "./BookCard";
import NewBook from "./NewBook";
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { createBook, getBooks } from 'apis/books';
import { Separator } from 'components/ui/separator';

const BooksPage = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newBookOpen, setNewBookOpen] = useState(false);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      handleBookCreate();
    },
  });

  useEffect(() => {
    handleFetchBooks();
  }, []);

  useEffect(() => {
    const arr = books.filter(b => (
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setDisplayBooks(arr);
  }, [searchTerm])

  useEffect(() => {
    console.log('display books',displayBooks);
  }, [displayBooks])

  const handleFetchBooks = async () => {
    try {
      const response = await getBooks();
      console.log(response.data);
      setBooks(response.data);
      setDisplayBooks(response.data);
      setTotalRecords(response.data.length); 
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: error.response.message });
    } finally {
      setLoader(false);
    }
  }

  const handleBookCreate = async () => {
    console.log(formik.values);
    try {
      await createBook({
        name: formik.values.name,
        author_id: formik.values.authorId,
        description: formik.values.description,
        available_copies: formik.values.availableCopies,
        image_url: formik.values.imageUrl
      });
      toast({ title: 'Book has been successfully created.' });
      await handleFetchBooks();
      setNewBookOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
    } finally {
      formik.resetForm();
    }
  }

  if (loader) {
    return (
      <div className="h-full">
        <Loader size='md' />
      </div>
    );
  }

  const searchHandler = (e) => {
    setSearchTerm(e.target.value.trim());
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
        <div className="w-[250px] shadow-sm bg-white border-r p-4 shrink-0" >
          <div className='flex flex-row items-center align-middle'>
            <h3 className='font-semibold text-xl'>Filters</h3>
            <Button className='w-full ml-2 mr-1 text-xs h-min'>Apply</Button>
            <Button className='w-full ml-1 mr-2 text-xs h-min'>Reset</Button>
          </div>
          <Separator className='my-2'/>
          <ScrollArea className='mt-4' style={{ height: "calc(100vh - 170px)" }}>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Available</span>
              </div>
              <div className='flex flex-row items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Unavailable</span>
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="w-full py-4">
          <div className='mb-4 px-4'>
            <Input
              placeholder="Search here..."
              className='w-full p-4'
              onChange={searchHandler}
            />
          </div>

          <ScrollArea className='px-4' style={{ height: "calc(100vh - 170px)" }}>
            <div className="grid grid-cols-2 gap-4">
              {displayBooks.map(book => <BookCard book={book} key={book.id}/>)}
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
