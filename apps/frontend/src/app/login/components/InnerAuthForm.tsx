'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import AuthForm from './AuthForm';

type VariantAuth = 'LOGIN' | 'REGISTER';

const InnerAuthForm = () => {
  const [variantAuth, setVariantAuth] = useState<VariantAuth>('LOGIN');

  const handleToggleVariantAuth = () => {
    setVariantAuth((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  };

  return (
    <motion.div
      layout
      className={clsx(
        'bg-primary flex min-h-[530px] w-full max-w-[900px] justify-between gap-5 rounded-lg p-3 shadow-md',
        variantAuth === 'LOGIN' ? 'flex-row-reverse' : 'flex-row'
      )}
      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
    >
      <motion.div
        layout
        className="flex w-full flex-col justify-center rounded-lg md:px-12"
      >
        <h1 className="text-3xl font-medium text-white md:text-4xl">
          {variantAuth === 'LOGIN'
            ? 'Sign in your account'
            : 'Create an account'}
        </h1>
        <div className="pb-6 pt-3 text-start text-xs text-neutral-400">
          {variantAuth === 'LOGIN'
            ? "Don't have an account?"
            : ' Already have an account?'}{' '}
          <span
            onClick={handleToggleVariantAuth}
            className="cursor-pointer underline"
          >
            {variantAuth === 'LOGIN' ? 'Register' : 'Login'}
          </span>
        </div>
        <AuthForm variantAuth={variantAuth} />
      </motion.div>
      <motion.div
        layout
        className="relative hidden w-full overflow-hidden rounded-lg bg-gray-700 md:block"
      >
        <Image
          src="/assets/login-banner.jpg"
          alt="Image"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 z-10 flex w-full justify-between px-4">
          <p className="text-white">Logo</p>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-slate-50/40 px-2 text-sm text-neutral-100"
          >
            Back to website <FiArrowRight />
          </Link>
        </div>
        <div className="absolute top-0 z-0 h-full w-full bg-neutral-900/40" />
      </motion.div>
    </motion.div>
  );
};

export default InnerAuthForm;
