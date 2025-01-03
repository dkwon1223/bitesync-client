
const Hero = () => {
  return (
    <div className="bg-white h-full">
      <div className="container mx-auto flex flex-col items-center justify-center py-16 h-full">
        <h1 className="text-4xl font-bold text-center mb-4">
          Simplify Your Restaurant Operations with BiteSync
        </h1>
        <p className="text-lg text-center max-w-2xl mb-6">
          Track inventory, manage menus, and boost sales—all in one place.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500">
            Get Started
          </button>
          <button className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600">
            Log In
          </button>
        </div>
        <img
          src="/path-to-dashboard-mockup.png"
          alt="Dashboard Mockup"
          className="mt-10 max-w-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
