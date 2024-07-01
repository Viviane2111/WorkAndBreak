// components/Home.js
import Timer from "./Timer";
import Navbar from "./Navbar";

const Home = () => {

  return (
    <div>
      <Navbar />
      <div className="home min-h-screen w-full bg-[#151515]">
        <div className="blurMask"></div>
        <Timer />
      </div>
    </div>
  );
};

export default Home;
