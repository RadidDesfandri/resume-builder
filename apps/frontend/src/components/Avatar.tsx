'use client';

import Image from 'next/image';

interface AvatarProps {
  user?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative inline-block h-9 w-9 overflow-hidden rounded-full md:h-11 md:w-11 ring-1 ring-gray-600">
      <Image alt="Avatar" src={user || '/assets/profileplaceholder.png'} fill />
    </div>
  );
};

export default Avatar;
