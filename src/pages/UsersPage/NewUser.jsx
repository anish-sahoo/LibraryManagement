import React from 'react';
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "components/ui/select"  


const NewUser = ({
  formik,
  newUserOpen,
  setNewUserOpen
}) => {
  return (
    <Dialog open={newUserOpen} onOpenChange={() => setNewUserOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold'>New User</DialogTitle>
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
            <Label htmlFor='Email'>Email</Label>
            <Input
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={
                Boolean(formik.touched.email && formik.errors.email) &&
                formik.errors.email
              }
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='Password'>Password</Label>
            <Input
              id='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              error={
                Boolean(formik.touched.password && formik.errors.password) &&
                formik.errors.password
              }
            />
          </div>
          
          <div>
            <Select
              value={formik.values.select}>
              <SelectTrigger>
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="VISITOR">Visitor</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <DialogFooter>
          <Button
            onClick={formik.handleSubmit}
            type='submit'
          >
            Add User
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>

  )
}

export default NewBook;
