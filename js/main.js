document.addEventListener('DOMContentLoaded',() =>{
    initMatrixBackground();
    initParticles();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initProjectFilters();
    initCounterAnimation();
    initContactForm();
    initSmoothScroll();
});
function initMatrixBackground(){
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize',resize);
    const chars = '01アイウエオカキクケコサシスセソタチツテト{}[]<>/\\|=+-*&^%$#@!;:';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    function draw(){
        ctx.fillStyle = 'rgba(10,10,15,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#00d4aa';
        ctx.font = `${fontSize}px JetBrains Mono,monospace`;
        for (let i = 0; i < drops.length; i++){
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char,i * fontSize,drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975){
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw,50);
}
function initParticles(){
    const container = document.getElementById('particles');
    if (!container) return;
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++){
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.opacity = `${0.2 + Math.random() * 0.3}`;
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const colors = ['#00d4aa','#6366f1','#8b5cf6','#06b6d4'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}
function initNavigation(){
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    function handleScroll(){
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50){
            navbar.classList.add('scrolled');
        }
        else{
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }
    window.addEventListener('scroll',handleScroll,{ passive: true });
    navToggle.addEventListener('click',() =>{
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    navLinks.forEach(link =>{
        link.addEventListener('click',() =>{
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    const sections = document.querySelectorAll('section[id]');
    function highlightNav(){
        const scrollY = window.pageYOffset;
        sections.forEach(section =>{
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
                navLinks.forEach(link =>{
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`){
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll',highlightNav,{ passive: true });
}
function initTypingEffect(){
    const typedElement = document.getElementById('typed-subtitle');
    if (!typedElement) return;
    const phrases = [
        'Étudiant Ingénieur ESIEA',
        'Passionné de Cybersécurité',
        'Explorateur Crypto Post-Quantique',
        'Développeur Créatif',
        'Amateur de Voile & Ski'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    function type(){
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting){
            typedElement.textContent = currentPhrase.substring(0,charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        }
        else{
            typedElement.textContent = currentPhrase.substring(0,charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length){
            isDeleting = true;
            typeSpeed = 2000; 
        }
        if (isDeleting && charIndex === 0){
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; 
        }
        setTimeout(type,typeSpeed);
    }
    setTimeout(type,1500);
}
function initScrollAnimations(){
    const animatedElements = document.querySelectorAll(
        '.section-title,.about-text,.about-stats,.skill-category,.skill-category-new,' +
        '.project-card,.timeline-item,.interest-card,.interest-card-simple,.award-card,' +
        '.contact-info,.contact-form-container,.soft-skills,.soft-skill-item,' +
        '.intro-pitch,.intro-stats,.stat-card,.skills-container,.conclusion-content'
    );
    animatedElements.forEach(el =>{
        el.classList.add('fade-in');
    });
    const observerOptions ={
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('stagger-children')){
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    },observerOptions);
    animatedElements.forEach(el => observer.observe(el));
    const staggerContainers = document.querySelectorAll(
        '.about-stats,.skills-grid,.soft-skills-grid,' +
        '.projects-grid,.interests-grid,.awards-grid'
    );
    staggerContainers.forEach(container =>{
        container.classList.add('stagger-children');
    });
}
function initSkillBars(){
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){
                const progress = entry.target.querySelector('.skill-progress');
                const level = entry.target.dataset.level || 0;
                setTimeout(() =>{
                    progress.style.width = `${level}%`;
                },200);
                observer.unobserve(entry.target);
            }
        });
    },{ threshold: 0.5 });
    skillItems.forEach(item => observer.observe(item));
}
function initProjectFilters(){
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn =>{
        btn.addEventListener('click',() =>{
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card =>{
                const category = card.dataset.category;
                if (filter === 'all' || category === filter){
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() =>{
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.4s ease';
                    },50);
                }
                else{
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() =>{
                        card.style.display = 'none';
                    },400);
                }
            });
        });
    });
}
function initCounterAnimation(){
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) =>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){
                const counter = entry.target;
                const target = parseInt(counter.dataset.count,10);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const updateCounter = () =>{
                    current += step;
                    if (current < target){
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    }
                    else{
                        counter.textContent = target;
                        if (target >= 10){
                            counter.textContent = target + '+';
                        }
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    },{ threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}
function initContactForm(){
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit',async (e) =>{
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Envoi en cours...';
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        try{
            await new Promise(resolve => setTimeout(resolve,1500));
            submitBtn.querySelector('.btn-text').textContent = 'Message envoyé!';
            submitBtn.style.background = '#10b981';
            form.reset();
            setTimeout(() =>{
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            },3000);
        } catch (error){
            submitBtn.querySelector('.btn-text').textContent = 'Erreur,réessayez';
            submitBtn.style.background = '#ef4444';
            setTimeout(() =>{
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            },3000);
        }
    });
    const inputs = form.querySelectorAll('input,select,textarea');
    inputs.forEach(input =>{
        input.addEventListener('focus',() =>{
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur',() =>{
            input.parentElement.classList.remove('focused');
        });
    });
}
function initSmoothScroll(){
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link =>{
        link.addEventListener('click',(e) =>{
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}
const profileImg = document.getElementById('profile-img');
if (profileImg){
    profileImg.addEventListener('error',() =>{
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder-initials';
        placeholder.innerHTML = '<span>RP</span>';
        placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg,#00d4aa 0%,#6366f1 100%);
            font-size: 3rem;
            font-weight: 700;
            color: #0a0a0f;
            font-family: 'JetBrains Mono',monospace;
        `;
        profileImg.parentElement.replaceChild(placeholder,profileImg);
    });
}
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown',(e) =>{
    if (e.key === konamiCode[konamiIndex]){
        konamiIndex++;
        if (konamiIndex === konamiCode.length){
            document.body.style.animation = 'hueRotate 2s ease';
            setTimeout(() =>{
                document.body.style.animation = '';
            },2000);
            konamiIndex = 0;
        }
    }
    else{
        konamiIndex = 0;
    }
});
const style = document.createElement('style');
style.textContent = `
    @keyframes hueRotate{
        0%{ filter: hue-rotate(0deg); }
        50%{ filter: hue-rotate(180deg); }
        100%{ filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);
console.log(`
%c
  Portfolio de Romain PAILHE                     
  Étudiant Ingénieur ESIEA                       
  Intéressé par la cryptographie post-quantique,
  l'IA,la cybersécurité et le dev web.             
  Disponible pour stage: Avril-Août 2026        
`,'color: #00d4aa; font-family: monospace;');
console.log('%cTip: Try the Konami Code','color: #f59e0b; font-size: 12px;');