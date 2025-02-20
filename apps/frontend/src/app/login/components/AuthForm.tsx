'use client';

import Button from '@/components/Button';
import Input from '@/components/input/Input';
import { authSchema } from '@/formiks/auth/schema';
import { useLoginSocialAuth } from '@/hooks/auth/useLoginSocialAuth';
import { Form, Formik } from 'formik';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface AuthFormProps {
  variantAuth: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ variantAuth }) => {
  const { handleLoginSocialAuth } = useLoginSocialAuth();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={authSchema}
      onSubmit={(value) => {
        alert(value);
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col gap-3 text-white">
          <Input
            id="email"
            name="email"
            type="email"
            error={!!errors.email}
            placeholder="Enter Your Email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            error={!!errors.password}
            placeholder="Enter your password"
          />
          <Button className="mt-5 text-sm" type="submit" secondary>
            {variantAuth === 'LOGIN' ? "Lets Go'!" : 'Join Now!'}
          </Button>
          <div className="flex w-full items-center gap-x-3 text-neutral-400">
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
            <p className="text-muted-foreground text-nowrap text-xs">
              Or continue with
            </p>
            <div className="h-[2px] w-full border-t border-t-neutral-400" />
          </div>
          <div className="flex gap-3">
            <Button
              className="gap-2 text-sm"
              type="button"
              fullWidth
              outline
              onClick={() => handleLoginSocialAuth('google')}
            >
              <FcGoogle size={23} />
              Google
            </Button>
            <Button
              className="gap-2 text-sm"
              type="button"
              fullWidth
              outline
              onClick={() => handleLoginSocialAuth('github')}
            >
              <FaGithub size={23} />
              Github
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
