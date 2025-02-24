import LayoutContainer from '@/components/layout/LayoutContainer';
import { getSessionServer } from '@/libs/supabase/getSessionServer';

export default async function Home() {
  const session = await getSessionServer();

  if (!session) {
    <p>Tidak ada yang login</p>;
  }

  console.log(session);

  return (
    <LayoutContainer className="bg-white" padded="large">
      <h1>
        WELCOME {session?.user.user_metadata.name} {session?.user.email}
      </h1>
    </LayoutContainer>
  );
}
