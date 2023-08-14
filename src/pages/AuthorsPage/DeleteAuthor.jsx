import React from 'react';
import { ReloadIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog"

const DeleteAuthor = ({
  selectedAuthor,
  deleteAuthorOpen,
  setDeleteAuthorOpen,
  btnLoader,
  handleAuthorDelete,
}) => {
  return (
    <AlertDialog open={deleteAuthorOpen} onOpenChange={() => setDeleteAuthorOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the author - {selectedAuthor.name} from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No, cancel</AlertDialogCancel>
          <AlertDialogAction disabled={btnLoader} onClick={() => handleAuthorDelete()}>
            {btnLoader && <ReloadIcon className='mr-2 h-3 w-3 animate-spin' />}
            Yes, continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAuthor;
