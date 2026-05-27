import ParticleBackground from './components/canvas/ParticleBackground'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Technologies from './components/sections/Technologies'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      {/* Interactive canvas background — fixed, behind everything */}
      <ParticleBackground />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main content — sits above the canvas */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
