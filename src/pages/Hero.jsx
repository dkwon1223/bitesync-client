import { useNavigate } from "react-router-dom";
import heroImage from '../assets/hero-cover.jpeg';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full text-white overflow-y-auto">
      <div className="container mx-auto flex flex-col items-center justify-center py-16 h-full bg-cover" style={{
        backgroundImage: `
          radial-gradient(circle, rgba(40, 70, 90, 0.8) 40%, rgba(0, 0, 0, 0.25) 100%), 
          url('${heroImage}')
        `,
      }}>
        <article className="max-w-3xl flex flex-col justify-center items-center text-pretty text-zinc-200">
          <h1 className="text-4xl font-bold text-center mb-4">
            Simplify Your Restaurant Operations with BiteSync
          </h1>
          <p className="text-2xl font-semibold text-center max-w-2xl mb-6">
            Track inventory, manage menus, and boost sales—all in one place.
          </p>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-indigo-500" onClick={() => navigate("/authenticate")}>
              Get Started
            </button>
          </div>
        </article>
      </div>
      
    </div>
  );
};

export default Hero;
