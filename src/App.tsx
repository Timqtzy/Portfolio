import "./App.css";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("Home");

  return (
    <section className="w-full h-screen flex justify-between font-mono bg-white bg-[radial-gradient(rgb(209,213,219)_1px,transparent_1px)] bg-size-[20px_20px]">
      <div className="flex justify-between max-w-7xl w-full h-20 mx-auto border-b border-gray-300 py-4">
        <div className="flex flex-col">
          <p className="font-medium text-2xl">Timothy</p>
          <p className="text-gray-500 text-[0.80rem]">Frontend Developer</p>
        </div>
        <div>
          <div className="flex gap-8 ml-16 items-center">
            <div className="bg-white border border-gray-300 flex gap-4 p-1 rounded-md">
              {["Home", "Work", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  className={`px-4 py-1 rounded-md transition cursor-pointer font-medium
                    ${active === item ? "bg-black text-white" : "text-black"}
                  `}
                >
                  {item}
                </button>
              ))}
            </div>

            <div>
              <button className="bg-white border border-gray-300 px-4 py-2 rounded-md text-orange-500 font-medium cursor-pointer">Let's Chat</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
