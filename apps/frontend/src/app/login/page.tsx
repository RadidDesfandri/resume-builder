import LayoutContainer from '@/components/layout/LayoutContainer';
import InnerAuthForm from './components/InnerAuthForm';

const Login = () => {
  return (
    <LayoutContainer center padded="large" className="gap-5">
      <InnerAuthForm />
    </LayoutContainer>
  );
};

export default Login;
