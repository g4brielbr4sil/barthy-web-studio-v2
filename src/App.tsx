import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MobileBottomNav } from './components/MobileBottomNav'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Solutions } from './components/Solutions'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const { activeSection, activateSection } = useActiveSection()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header
        activeSection={activeSection}
        onNavigate={activateSection}
      />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Solutions />
        <Process />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={activateSection}
      />
    </>
  )
}

export default App
