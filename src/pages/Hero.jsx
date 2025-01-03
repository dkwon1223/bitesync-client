import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full text-white">
      <div className="container mx-auto flex flex-col items-center justify-center py-16 h-full bg-contain" style={{
        backgroundImage: `
          radial-gradient(circle, rgba(75, 20, 20, 0.9) 40%, rgba(0, 0, 0, 0.25) 100%), 
          url('/src/assets/hero-cover.jpeg')
        `,
      }}>
        <article className="max-w-3xl flex flex-col justify-center items-center text-pretty">
          <h1 className="text-4xl font-extrabold text-center mb-4">
            Simplify Your Restaurant Operations with BiteSync
          </h1>
          <p className="text-2xl font-normal text-center max-w-2xl mb-6">
            Track inventory, manage menus, and boost sales—all in one place.
          </p>
          <div className="flex space-x-4">
            <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-red-500" onClick={() => navigate("/authenticate")}>
              Get Started
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Hero;
