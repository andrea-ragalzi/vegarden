import { useState } from 'react';
import './../App.scss';

interface Props {
  name: string;
}

function Home({ name }: Props) {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="ml-2 font-bold text-lg text-gray-800">Vite + React</h1>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{`Hello, ${name}!`}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <button
            className="my-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCount((count) => count + 1)}
          >
            Press me ({count})
          </button>
        </div>
      </main>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around h-16">
            <button className="flex items-center justify-center w-full h-full focus:outline-none">
              Home
            </button>
            <button className="flex items-center justify-center w-full h-full focus:outline-none">
              Search
            </button>
            <button className="flex items-center justify-center w-full h-full focus:outline-none">
              Post
            </button>
            <button className="flex items-center justify-center w-full h-full focus:outline-none">
              Chat
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;
