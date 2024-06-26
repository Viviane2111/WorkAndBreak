// components/Home.js
import Timer from "./Timer";
import Navbar from "./Navbar";

const Home = () => {

  return (
    <div className="min-h-screen w-full bg-[#151515]">
      <Navbar />
      <Timer />
    </div>
  );
};

export default Home;
