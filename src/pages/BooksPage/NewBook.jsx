import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Textarea } from 'components/ui/textarea';
import { Button } from 'components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog"


const NewBook = ({
  formik,
  newBookOpen,
  setNewBookOpen
}) => {
  return (
    <Dialog open={newBookOpen} onOpenChange={() => setNewBookOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold'>New Book</DialogTitle>
        </DialogHeader>

        <div className='flex space-y-4 flex-col w-full'>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={
                Boolean(formik.touched.name && formik.errors.name) &&
                formik.errors.name
              }
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='author ID'>Author ID</Label>
            <Input 
              type='number'
              id='authorId'
              name='authorId'
              onChange={formik.handleChange}
              value={formik.values.authorId}
              error={
                Boolean(formik.touched.authorId && formik.errors.authorId) &&
                formik.errors.authorId
              }
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='Image URL'>Image URL</Label>
            <Input
              id='imageUrl'
              name='imageUrl'
              onChange={formik.handleChange}
              value={formik.values.imageUrl}
              error={
                Boolean(formik.touched.imageUrl && formik.errors.imageUrl) &&
                formik.errors.imageUrl
              }
            />
          </div>
          
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              onChange={formik.handleChange}
              value={formik.values.description}
              error={
                Boolean(formik.touched.description && formik.errors.description) &&
                formik.errors.description
              }
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='Available Copies'>Available Copies</Label>
            <Input 
              type='number'
              id='availableCopies'
              name='availableCopies'
              onChange={formik.handleChange}
              value={formik.values.availableCopies}
              error={
                Boolean(formik.touched.availableCopies && formik.errors.availableCopies) &&
                formik.errors.availableCopies
              }
            />
          </div>

        </div>

        <DialogFooter>
          <Button
            onClick={formik.handleSubmit}
            type='submit'
          >
            Add Book
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>

  )
}

export default NewBook;
