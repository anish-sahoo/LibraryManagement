import React, { useState, useEffect } from 'react';
import { useToast } from 'components/ui/use-toast';
import { sleep } from 'lib/utils';
import Loader from 'components/Loader';
import { Button } from 'components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { getStudents } from 'apis/students';
import NewStudent from './NewStudent';
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { useFormik } from 'formik';
import { createStudent } from 'apis/students';

const StudentsPage = () => {
  const { toast } = useToast();
  const [loader, setLoader] = useState(true);
  const [students, setStudents] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newStudentOpen, setNewStudentOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => {
      handleStudentCreate();
    },
  });

  const handleStudentCreate = async () => {
    console.log(formik.values);
    try {
      await createStudent({
        name: formik.values.name,
        registration_id: formik.values.studentID,
        email: formik.values.email,
        books_loaned: 0,
      });
      toast({ title: 'User has been successfully created.' });
      await fetchStudents();
      setNewStudentOpen(false);
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
    } finally {
      formik.resetForm();
    }
  }

  const fetchStudents = async () => {
    try {
      await sleep(1000);
      const response = await getStudents();
      console.log(response.data);
      setStudents(response.data);
      setTotalRecords(response.data.length);
    } catch (error) {
      console.log(error);
      toast({ variant: 'destructive', title: error.response.message });
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
    <div className='bg-white min-h-full'>
      <div className="px-6 py-4 bg-white flex justify-between items-center border-b">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">Total records: {totalRecords}</p>
        </div>

        <Button onClick={() => setNewStudentOpen(true)}>
          <PlusIcon className='mr-2' /> Add new
        </Button>
      </div>

      <div className="px-6 mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Books Loaned</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map(student => {
              return (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.books_loaned}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <NewStudent formik={formik}
        newStudentOpen={newStudentOpen}
        setNewStudentOpen={setNewStudentOpen}>
      </NewStudent>

    </div>
  )
}

export default StudentsPage;
