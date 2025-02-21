import { getSession } from '@/components/getSession';
import React from 'react';

const Dashboard = async () => {
  const session = await getSession();

  if (!session) {
    <p>Tidak ada yang login</p>;
  }

  console.log(session?.user.user_metadata.name);

  console.log(session);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-primary flex items-center justify-between px-6 py-4 text-white shadow-md">
        <h1 className="text-2xl font-semibold">
          Welcome {session?.user.user_metadata.name || 'Guest'}
        </h1>
        <button className="bg-accent hover:bg-accent/90 rounded-lg px-4 py-2 font-medium text-white">
          + New Resume
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Your Resumes</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg"
            >
              <h3 className="text-lg font-medium">Resume {id}</h3>
              <p className="text-sm text-gray-600">Last edited: Feb 20, 2025</p>
              <div className="mt-3 flex justify-between">
                <button className="text-primary hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
