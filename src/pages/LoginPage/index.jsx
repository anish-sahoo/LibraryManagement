import React, { useState } from 'react';
import { useFormik } from 'formik';
import { EnterIcon, ReloadIcon } from '@radix-ui/react-icons'

import { Button } from 'components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { VALIDATION_SCHEMA, INITIAL_VALUE } from './constants';
import { useAuth } from 'lib/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const [btnLoader, setBtnLoader] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUE,
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: () => handleLogin(),
  });

  const handleLogin = () => {
    setBtnLoader(true);
    setTimeout(() => {
      login(formik.values);
    }, 3000);
  }

  return (
    <div className='flex justify-center items-center h-full'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Authenticate yourself to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  placeholder='Enter your email address'
                  name='email'
                  type='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={
                    Boolean(formik.touched.email && formik.errors.email) &&
                    formik.errors.email
                  }
                />
              </div>

              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  placeholder='Enter your password'
                  name='password'
                  type='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    Boolean(formik.touched.password && formik.errors.password) &&
                    formik.errors.password
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-end mt-4'>
          <Button
            onClick={formik.handleSubmit}
            type='submit'
            disabled={btnLoader}
          >
            {btnLoader ? (
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <EnterIcon className='mr-2 h-4 w-4' />
            )}

            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage;
