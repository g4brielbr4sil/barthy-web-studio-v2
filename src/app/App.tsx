import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Solutions } from '../components/Solutions'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { useActiveSection } from '../hooks/useActiveSection'

function App() {
  const { activeSection, navigateToSection } = useActiveSection()

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />
      <main id="conteudo">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <Solutions />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
