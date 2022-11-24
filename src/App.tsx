import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Start } from "./pages/Start"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<Start />} />
    </Routes>
  )
}
