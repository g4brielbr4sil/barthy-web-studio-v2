import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { Hero } from '../components/hero/Hero'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SolutionsSection } from '../components/sections/SolutionsSection'
import { useActiveSection } from '../hooks/useActiveSection'

function App() {
  const { activeSection, isPastHero, navigateToSection } =
    useActiveSection()

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
        <AboutSection onNavigate={navigateToSection} />
        <ProjectsSection />
        <SolutionsSection onNavigate={navigateToSection} />
        <ProcessSection onNavigate={navigateToSection} />
        <ContactSection />
      </main>
      <Footer onNavigate={navigateToSection} />
    </>
  )
}

export default App
