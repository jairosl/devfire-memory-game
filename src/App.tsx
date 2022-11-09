import { Card } from "./components/card"
import { Grid } from "./components/grid";
import { cards } from "./data/cards";

const handleClick = (id: string) => {
  console.log(id);
}
function App() {
  return(
    <div className="h-screen bg-[url('/bg.png')] bg-no-repeat bg-cover flex items-center justify-center ">
      <div className="flex justify-center w-2/3 h-3/4  pt-6 rounded-[48px] bg-gradient-to-b from-purple-300 to-purple-500">
        <form className="flex flex-col space-y-6 items-end">
          <img src="/logo.png" alt="Logo DevFire" />

          <div className="flex space-x-4 w-full justify-end w-480 ">
            <label
              htmlFor="playOne"
              className="font-pixel text-shadow text-red-black text-6xl uppercase text-stroke font-bold"
            >
              p1
            </label>
            <input
              id="playOne"
              type="text"
              maxLength={10}
              className="rounded-full px-5 font-pixel text-4xl bg-yellow-100 shadow-inset"
              autoComplete="off"
            ></input>
          </div>

          <div className="flex space-x-4 w-full justify-end">
            <label
              htmlFor="playTwo"
              className="font-pixel text-shadow text-blue-black text-6xl uppercase text-stroke font-bold"
            >
              p2
            </label>
            <input
              id="playTwo"
              type="text"
              maxLength={10}
              className="rounded-full px-5 font-pixel text-4xl bg-yellow-100 shadow-inset"
              autoComplete="off"
            ></input>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="bg-pink-100 text-white font-pixel text-5xl px-12 py-3 rounded-full shadow-2xl uppercase"
            >
              play
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default App

/*

*/