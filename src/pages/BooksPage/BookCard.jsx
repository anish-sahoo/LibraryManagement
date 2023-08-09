import React from 'react';
import {
  Card,
  CardDescription,
  CardTitle,
} from 'components/ui/card'
import { Badge } from "components/ui/badge"

const BookCard = (book, index) => {
  return (
    <Card className='w-full mb-2 p-4 rounded-md' key={index}>
      <div className='flex'>
        <div className='w-36 h-52 rounded-md shrink-0'> 
          <img src={book.thumbnailUrl} alt={book.name}></img>
        </div>
        <div className='ml-4 w-full'>
          <div className='flex justify-between items-start'>
            <div className='mr-3'>
              <CardTitle className='text-xl font-bold'>{book.name}</CardTitle>
              <CardDescription className='!m-0'>By {book.author}</CardDescription>
            </div>
            <Badge className={`shrink=0 ${book.availableCopies <= 1 ? "bg-destructive":""}`}>{book.availableCopies} Available</Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BookCard;
