import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Nextis.css';

function Nextis() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="nextis-landing-page">
      <header className="nextis-header">
        <div className="header-container">
          <div className="logo-container">
            <img
              src="/images/logo-nextis.png"
              alt="NexTIS Logo"
              className="nextis-logo"
            />
          </div>
          
          <nav className={`header-nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('servicos')}>Serviços</button>
            <button onClick={() => scrollToSection('sobre')}>Sobre nós</button>
            <button onClick={() => scrollToSection('contato')}>Contato</button>
            <div onClick={() => navigate('/login')}>
              <button className="login-button">Login</button>
            </div>
          </nav>
          
          <button className="hamburger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Simplifique operações e aumente a eficiência do seu negócio</h1>
          <p>Comandas digitais e controle de estoque integrados para gestão rápida, prática e sem complicações.</p>
          <button className="cta-button" onClick={() => scrollToSection('servicos')}>Ver serviços</button>
        </div>
        <div className="hero-image">
          <img src="/images/home-nextis.png" alt="Sistema NexTIS" />
        </div>
      </section>

      <section id="servicos" className="services-section">
        <div className="section-header">
          <div className="title-container">
            <h2 className="section-title">Serviços</h2>
            <p className="section-subtitle">Conheça nossas soluções integradas para o seu negócio. Oferecemos sistemas completos para gestão de comandas digitais e controle de estoque, proporcionando eficiência e praticidade para seu estabelecimento.</p>
          </div>
        </div>

        <div className="nextis-services-section">
          <div className="nextis-service-card" onClick={() => navigate('/comandou')}>
            <div className="nextis-service-icon">
              <img src="/images/icon-comandou.png" alt="ComandOU Logo" />
            </div>
            <h2>ComandOU</h2>
            <p>
              Sistema completo de comanda virtual e cardápio digital.
              Seus clientes podem visualizar o cardápio e fazer pedidos pelo celular,
              enquanto você gerencia tudo de forma simples e intuitiva.
            </p>
            <button className="nextis-service-button">Saiba mais</button>
          </div>

          <div className="nextis-service-card" onClick={() => navigate('/estock')}>
            <div className="nextis-service-icon">
              <img src="/images/icon-estock.png" alt="eStock Logo" />
            </div>
            <h2>eStock</h2>
            <p>
              Controle de estoque inteligente para empresas.
              Gerencie seus produtos, receba alertas de reposição e tenha relatórios
              detalhados para tomar as melhores decisões para seu negócio.
            </p>
            <button className="nextis-service-button">Saiba mais</button>
          </div>
        </div>
      </section>

      <div className="rectangle-image">
        <img src="/images/rectangle.png" alt="Nossa tecnologia" />
      </div>

      <section id="sobre" className="team-section">
        <div className="section-header">
          <div className="title-container">
            <h2 className="section-title">Time</h2>
            <p className="section-subtitle">Esse projeto foi desenvolvido por estudantes de ADS da Cruzeiro do Sul. Nossa equipe é composta por profissionais dedicados que trabalharam em diferentes áreas do projeto para entregar soluções de qualidade.</p>
          </div>
        </div>

        <div className="team-grid">
          <div className="team-member">
            <div className="member-card">
              <img src="/images/beatriz.png" alt="Beatriz Veloso" />
              <div className="member-info">
                <h3>Beatriz Veloso</h3>
                <p>UI/UX Designer e Engenheira Front-end</p>
                <div className="divider"></div>
                <p className="member-bio">Responsável pelo design e programação front-end dos sistemas.</p>
              </div>
              <a href="https://www.linkedin.com/in/beatriz-veloso6/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/leticia.png" alt="Leticia Monteiro" />
              <div className="member-info">
                <h3>Leticia Monteiro</h3>
                <p>Analista de Documentação Técnica</p>
                <div className="divider"></div>
                <p className="member-bio">Responsável pela documentação do projeto ComandOU.</p>
              </div>
              <a href="https://www.linkedin.com/in/let%C3%ADcia-monteiro-4529b0349/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/caio.png" alt="Caio" />
              <div className="member-info">
                <h3>Caio</h3>
                <p>Engenheiro de Software Back-end</p>
                <div className="divider"></div>
                <p className="member-bio">Desenvolveu o back-end dos dois projetos.</p>
              </div>
              <a href="https://www.linkedin.com/in/caio-ferreira-2a5394327/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/nathalia.png" alt="Nathalia Pacheco" />
              <div className="member-info">
                <h3>Nathalia Pacheco</h3>
                <p>Arquiteta de Sistemas</p>
                <div className="divider"></div>
                <p className="member-bio">Responsável pelos diagramas do projeto ComandOU.</p>
              </div>
              <a href="https://www.linkedin.com/in/nath%C3%A1lia-do-nascimento-pacheco-a28a41295/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/gabriel.png" alt="Gabriel Magalhães" />
              <div className="member-info">
                <h3>Gabriel Magalhães</h3>
                <p>Engenheiro de Software Back-end</p>
                <div className="divider"></div>
                <p className="member-bio">Desenvolveu o back-end dos dois projetos.</p>
              </div>
              <a href="https://linkedin.com/in/gabriel-magalhaes" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/georgia.png" alt="Georgia Marli" />
              <div className="member-info">
                <h3>Georgia Marli</h3>
                <p>Administradora de Banco de Dados</p>
                <div className="divider"></div>
                <p className="member-bio">Responsável pelo banco de dados dos dois projetos.</p>
              </div>
              <a href="https://www.linkedin.com/in/georgia-marli-concei%C3%A7%C3%A3o-silva-324874214?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/daniel.png" alt="Daniel Urbano" />
              <div className="member-info">
                <h3>Daniel Urbano</h3>
                <p>Arquiteto de Sistemas</p>
                <div className="divider"></div>
                <p className="member-bio">Responsável pelos diagramas do projeto eStock.</p>
              </div>
              <a href="https://www.linkedin.com/in/daniel-c%C3%A2ndido-759493343/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>

          <div className="team-member">
            <div className="member-card">
              <img src="/images/maria.png" alt="Maria Vitoria" />
              <div className="member-info">
                <h3>Maria Vitoria</h3>
                <p>Analista de Requisitos</p>
                <div className="divider"></div>
                <p className="member-bio">Levantamento de requisitos e documentação do eStock.</p>
              </div>
              <a href="https://www.linkedin.com/in/maria-vitoria-oliveira-da-silva-044a43270/edit/forms/next-action/after-connect-add-position/" target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                <img src="/images/linkedin-icon.png" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contato" className="nextis-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/logo-nextis.png" alt="NexTIS Logo" />
          </div>
          <div className="footer-info">
            <div className="footer-contacts">
              <p><strong>Email:</strong> nextiscontato@gmail.com</p>
              <p><strong>Telefone:</strong> (11) 0002-8922</p>
              <p><strong>Endereço:</strong> Cruzeiro do Sul -  Av. das Nações Unidas, 18605 - Santo Amaro, São Paulo - SP, 04795-100</p>
            </div>
            <div className="footer-copyright">
              <p>© {new Date().getFullYear()} NexTIS. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Nextis;