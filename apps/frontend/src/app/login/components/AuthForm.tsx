'use client';

import Button from '@/components/Button';
import Input from '@/components/input/Input';
import { authSchema } from '@/formiks/auth/schema';
import { useLoginCredential } from '@/hooks/auth/useLoginCredential';
import { useLoginSocialAuth } from '@/hooks/auth/useLoginSocialAuth';
import { useRegisterCredential } from '@/hooks/auth/useRegisterCredential';
import { AuthPayload } from '@/types/usertype';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

interface AuthFormProps {
  variantAuth: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ variantAuth }) => {
  const { handleLoginSocialAuth } = useLoginSocialAuth();
  const { handleLoginCredential: login, isLoading } = useLoginCredential();
  const { mutateAsync: register, isPending: loadingRegister } =
    useRegisterCredential();

  const handleSubmit = async (
    payload: AuthPayload,
    actions: FormikHelpers<AuthPayload>
  ) => {
    if (variantAuth === 'LOGIN') {
      login(payload, actions);
    }
    if (variantAuth === 'REGISTER') {
      try {
        await register(payload);
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={authSchema}
      onSubmit={async (values, actions) => {
        handleSubmit(values, actions);
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col gap-3 text-white">
          <Input
            id="email"
            name="email"
            type="email"
            error={!!errors.email}
            disabled={loadingRegister || isLoading}
            placeholder="Enter Your Email"
          />
          <Input
            id="password"
            name="password"
            type="password"
            error={!!errors.password}
            disabled={loadingRegister || isLoading}
            placeholder="Enter your password"
          />
          <Button
            disabled={loadingRegister || isLoading}
            className="mt-5 text-sm"
            type="submit"
            secondary
          >
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
              disabled={loadingRegister || isLoading}
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
              disabled={loadingRegister || isLoading}
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
