import { getSession } from '@/components/getSession';

export default async function Home() {
  const session = await getSession();

  if (!session) {
    <p>Tidak ada yang login</p>;
  }

  console.log(session);

  return (
    <div className="flex h-full w-full items-center justify-center gap-8 bg-black text-white">
      WELCOME {session?.user.user_metadata.name} {session?.user.email}
    </div>
  );
}
