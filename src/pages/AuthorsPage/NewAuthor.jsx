import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Button } from 'components/ui/button'
import { Checkbox } from "components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog"


const NewAuthor = ({
  formik,
  newAuthorOpen,
  setNewAuthorOpen,
  btnLoader,
}) => {
  return (
    <Dialog open={newAuthorOpen} onOpenChange={() => setNewAuthorOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold'>New Author</DialogTitle>
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

          <div className="flex items-center space-x-1.5">
            <Checkbox
              id="active"
              onCheckedChange={formik.handleChange}
              checked={formik.values.active}
            />
            <Label
              htmlFor="active"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={formik.handleSubmit}
            type='submit'
            size='sm'
            disabled={btnLoader}
          >
            {btnLoader && <ReloadIcon className='mr-2 h-3 w-3 animate-spin' />}
            Save changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>

  )
}

export default NewAuthor;
