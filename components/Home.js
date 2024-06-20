// components/Home.js
import Timer from "./Timer";
import Navbar from "./Navbar";

const Home = () => {

  return (
    <div className="h-[100vh] bg-[#010101]">
      <Navbar />
      <Timer />
    </div>
  );
};

export default Home;
