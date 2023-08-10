import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
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
            <Label htmlFor='id'>ID</Label>
            <Input
              id='id'
              name='id'
              onChange={formik.handleChange}
              value={formik.values.id}
              error={
                Boolean(formik.touched.id && formik.errors.id) &&
                formik.errors.id
              }
            />
          </div>

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
            <Label htmlFor='author'>Author</Label>
            <Input
              id='author'
              name='author'
              onChange={formik.handleChange}
              value={formik.values.author}
              error={
                Boolean(formik.touched.author && formik.errors.author) &&
                formik.errors.author
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={formik.handleSubmit}
            type='submit'
          >
            Save changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>

  )
}

export default NewBook;
