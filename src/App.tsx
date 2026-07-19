import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Projects } from './components/Projects'
import { Solutions } from './components/Solutions'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const { activeSection, isPastHero, navigateToSection } = useActiveSection()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header
        activeSection={activeSection}
        isPastHero={isPastHero}
        onNavigate={navigateToSection}
      />
      <main id="conteudo">
        <Hero onNavigate={navigateToSection} />
        <About onNavigate={navigateToSection} />
        <Projects />
        <Solutions onNavigate={navigateToSection} />
        <Process onNavigate={navigateToSection} />
        <Contact />
      </main>
      <Footer onNavigate={navigateToSection} />
    </>
  )
}

export default App
