import ParticleBackground from './components/canvas/ParticleBackground'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Technologies from './components/sections/Technologies'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <ParticleBackground />
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
