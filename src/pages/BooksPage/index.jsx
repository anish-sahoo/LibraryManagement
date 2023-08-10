import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import { sleep } from 'lib/utils';
import Loader from  'components/Loader';
import { Button } from 'components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "components/ui/scroll-area"
import { Input } from 'components/ui/input'
import BookCard from "./BookCard";

const BooksPage = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);

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

        <Button>
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

          <ScrollArea className='px-4' style={{ height: "calc(100vh - 185px)" }}>
            <div className="grid grid-cols-2 gap-4">
              {books.map(book => <BookCard book={book} key={book.id} />)}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default BooksPage;
