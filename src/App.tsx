import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Solutions } from './components/Solutions'

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Solutions />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
