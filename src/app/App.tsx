import { Footer } from '../components/footer/Footer'
import { VisualDebugPanel } from '../components/debug/VisualDebugPanel'
import { Header } from '../components/header/Header'
import { Hero } from '../components/hero/Hero'
import { ContactSection } from '../components/sections/ContactSection'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProblemsSection } from '../components/sections/ProblemsSection'
import { ProjectsSection } from '../components/sections/ProjectsSection'
import { SolutionsSection } from '../components/sections/SolutionsSection'
import { SystemsSection } from '../components/sections/SystemsSection'
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
        <ProblemsSection />
        <SolutionsSection onNavigate={navigateToSection} />
        <SystemsSection onNavigate={navigateToSection} />
        <ProjectsSection />
        <ProcessSection onNavigate={navigateToSection} />
        <ContactSection />
      </main>
      <Footer onNavigate={navigateToSection} />
      <VisualDebugPanel />
    </>
  )
}

export default App
