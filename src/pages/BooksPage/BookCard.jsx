import React from 'react';
import { Card } from 'components/ui/card'
import { Badge } from "components/ui/badge"

const BookCard = ({ book, author }) => {
  return (
    <Card className='w-full p-4 rounded-sm'>
      <div className='flex'>
        <div className='w-36 h-52 rounded-sm shrink-0'>
          <img src={book.image_url} alt={book.name} className='object-contain h-full w-full'></img>
        </div>
        <div className='ml-4 w-full'>
          <div className='flex justify-between items-start'>
            <h1 className='text-xl font-bold line-clamp-1'>{book.name}</h1>
            <Badge className={`shrink-0 ml-2 ${book.available_copies <= 1 ? "bg-destructive" : ""}`}>{book.available_copies} Available</Badge>
          </div>

          <p className='mb-4'>By <span className='italic text-blue-600 font-semibold'>{book.author_id}</span></p>

          <p className='line-clamp-3'>{book.description}</p>
        </div>
      </div>
    </Card>
  )
}

export default BookCard;
