import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 dark:bg-gray-800 px-8">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mt-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded hover:bg-blue-500 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
