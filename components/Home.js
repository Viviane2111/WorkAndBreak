// components/Home.js
import Timer from "./Timer";
import Navbar from "./Navbar";

const Home = () => {

  return (
    <div className="h-[100vh] w-[100vw] bg-[#151515]">
      <Navbar />
      <Timer />
    </div>
  );
};

export default Home;
