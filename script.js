document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Atualiza o link ativo de navegação
    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200 && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Definir o link ativo inicial
    
    // Rolagem suave para os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verifica se o link é para uma seção na mesma página (começa com #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
            // Se não começa com #, deixa o navegador lidar com o link normalmente
        });
    });
    
    // Botão "voltar ao topo"
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Verificar se o botão de voltar ao topo existe
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Exibir/ocultar o botão baseado na posição do scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Inicializar a visibilidade do botão
        backToTopBtn.style.display = 'none';
    }
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav .prev');
    const nextBtn = document.querySelector('.testimonial-nav .next');
    
    if (testimonialSlider && testimonialContainer && prevBtn && nextBtn && testimonialCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = 380; // Largura do card (350px) + gap (30px)
        const cardCount = testimonialCards.length;
        const sliderWidth = testimonialSlider.offsetWidth;
        const cardsVisible = Math.floor(sliderWidth / cardWidth); // Número de cards visíveis ao mesmo tempo
        const maxIndex = Math.max(0, cardCount - cardsVisible); // Índice máximo para evitar deslizar além do necessário
        
        function updateSlider() {
            testimonialContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            } else {
                // Voltar para o início
                currentIndex = 0;
                updateSlider();
            }
        });
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            } else {
                // Voltar para o final
                currentIndex = maxIndex;
                updateSlider();
            }
        });
        
        // Ajustar o slider ao redimensionar a janela
        window.addEventListener('resize', () => {
            const newSliderWidth = testimonialSlider.offsetWidth;
            const newCardsVisible = Math.floor(newSliderWidth / cardWidth);
            const newMaxIndex = Math.max(0, cardCount - newCardsVisible);
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }
            updateSlider();
        });
        
        // Avançar automaticamente no slider de depoimentos
        let sliderInterval = setInterval(function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        }, 5000);
        
        // Pausar a rotação automática ao passar o mouse
        testimonialContainer.addEventListener('mouseenter', function() {
            clearInterval(sliderInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', function() {
            sliderInterval = setInterval(function() {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
        });
    }
    
    // Animações de revelação ao rolar
    const animatedSections = document.querySelectorAll('.services, .about, .team, .testimonials, .contact');
    
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        
        if (!entry.isIntersecting) return;
        
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        
        observer.unobserve(entry.target);
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    animatedSections.forEach(function(section) {
        sectionObserver.observe(section);
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 1s, transform 1s';
    });
});