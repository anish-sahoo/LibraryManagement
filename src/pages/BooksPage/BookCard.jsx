import React from 'react';
import {
  Card,
  CardDescription,
  CardTitle,
} from 'components/ui/card'
import { Badge } from "components/ui/badge"

const BookCard = () => {

  return (
    <Card className='w-full mb-2 p-4 rounded-md'>
      <div className='flex'>
        <div className='w-36 h-52 bg-gray-400 rounded-md shrink-0'></div>
        <div className='ml-4 w-full'>
          <div className='flex justify-between items-start'>
            <div className='mr-3'>
              <CardTitle className='text-xl font-bold'>Dummy Book Name</CardTitle>
              <CardDescription className='!m-0'>Written by Rabindranath Tagore</CardDescription>
            </div>

            <Badge className='shrink-0'>2 Available</Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default BookCard;
