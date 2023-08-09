import React, { useState, useEffect } from 'react';
// import { useToast } from 'components/ui/use-toast';
// import { sleep } from 'lib/utils';
// import Loader from  'components/Loader';
import { Button } from 'components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "components/ui/scroll-area"
import { Input } from 'components/ui/input'
// import BookCard from './BookCard';
import { BookCardList } from './BookCardList';

const BooksPage = () => {
  return (
    <div>
      <div className="p-6 bg-white flex justify-between items-center border-b">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Books</h2>
          <p className="text-muted-foreground">Total records: 500</p>
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
            <BookCardList />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default BooksPage;
