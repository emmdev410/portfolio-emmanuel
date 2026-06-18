/* EDev Portfolio - JavaScript separado del HTML */

document.addEventListener("DOMContentLoaded", () => {

        const sections = document.querySelectorAll("section[data-theme]");
        const navLinks = document.querySelectorAll(".nav-link");

        const sectionTheme = {
            inicio: "green",
            soluciones: "purple",
            "sobre-mi": "green",
            tecnologias: "green",
            proyectos: "purple",
            trayectoria: "green",
            formacion: "green",
            contacto: "purple"
        };

        function setTheme(sectionId) {

            document.body.dataset.theme =
                sectionTheme[sectionId] || "green";
                const logo =
                    document.getElementById("logoExpandible");

                if(logo){

                    logo.classList.remove(
                        "logo-green",
                        "logo-purple"
                    );

                    if(
                        sectionTheme[sectionId] === "purple"
                    ){

                        logo.classList.add(
                            "logo-purple"
                        );

                    }else{

                        logo.classList.add(
                            "logo-green"
                        );

                    }

                }

            navLinks.forEach(link => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + sectionId
                );

            });

        }

        /*
            Detecta la sección visible
            y actualiza el menú y tema.
        */
        function updateActiveSection() {

            let currentSection = "inicio";

            sections.forEach(section => {

                const top = section.offsetTop - 180;
                const bottom = top + section.offsetHeight;

                if (
                    window.scrollY >= top &&
                    window.scrollY < bottom
                ) {
                    currentSection = section.id;
                }

            });

            setTheme(currentSection);
        }

        window.addEventListener(
            "scroll",
            updateActiveSection
        );

        window.addEventListener(
            "load",
            updateActiveSection
        );

        updateActiveSection();

    });

const galleries = {

        depotlink: [
            "assets/projects/depotlink-pos/cover.png",
            "assets/projects/depotlink-pos/1.jpg",
            "assets/projects/depotlink-pos/2.jpeg",
            "assets/projects/depotlink-pos/3.jpeg",
            "assets/projects/depotlink-pos/4.jpeg",
            "assets/projects/depotlink-pos/5.jpeg",
            "assets/projects/depotlink-pos/7.jpeg"
        ],

        pepsocr: [
            "assets/projects/pepsocr/cover.png",
            "assets/projects/pepsocr/1.jpeg",
            "assets/projects/pepsocr/2.jpeg",
            "assets/projects/pepsocr/3.jpeg",
            "assets/projects/pepsocr/4.jpeg",
            "assets/projects/pepsocr/5.jpeg",
            "assets/projects/pepsocr/6.jpeg",
            "assets/projects/pepsocr/7.jpg",
            "assets/projects/pepsocr/8.jpeg",
            "assets/projects/pepsocr/9.jpeg",
            "assets/projects/pepsocr/10.jpeg",
            "assets/projects/pepsocr/11.jpeg"
        ],

        smartpos: [
            "assets/projects/smart-pos/cover.png",
            "assets/projects/smart-pos/1.jpeg",
            "assets/projects/smart-pos/2.jpg",
            "assets/projects/smart-pos/3.jpeg",
            "assets/projects/smart-pos/4.jpeg",
            "assets/projects/smart-pos/5.jpeg",
            "assets/projects/smart-pos/6.jpeg",
            "assets/projects/smart-pos/7.jpeg"
        ],

        taqueriapos: [
            "assets/projects/taqueria-pos-android/cover.png",
            "assets/projects/taqueria-pos-android/1.jpeg",
            "assets/projects/taqueria-pos-android/2.jpeg",
            "assets/projects/taqueria-pos-android/3.jpeg",
            "assets/projects/taqueria-pos-android/4.jpeg"
        ],

        taqueriayeshua: [
            "assets/projects/taqueria-yeshua/cover.png",
            "assets/projects/taqueria-yeshua/1.jpeg",
            "assets/projects/taqueria-yeshua/2.jpeg",
            "assets/projects/taqueria-yeshua/3.jpeg",
            "assets/projects/taqueria-yeshua/4.jpeg",
            "assets/projects/taqueria-yeshua/5.jpeg",
            "assets/projects/taqueria-yeshua/6.jpeg",
            "assets/projects/taqueria-yeshua/7.jpeg",
            "assets/projects/taqueria-yeshua/8.jpeg",
            "assets/projects/taqueria-yeshua/9.jpeg",
            "assets/projects/taqueria-yeshua/10.jpeg",
            "assets/projects/taqueria-yeshua/11.jpeg",
            "assets/projects/taqueria-yeshua/12.jpeg",
            "assets/projects/taqueria-yeshua/13.jpeg"
        ],

        portfolio: [
            "assets/projects/portafolio/cover.png",
            "assets/projects/portafolio/1.png",
            "assets/projects/portafolio/2.png",
            "assets/projects/portafolio/3.png"
        ],
        analytics:[
            "assets/projects/analytics/cover.png",
            "assets/projects/analytics/1.jpeg",
            "assets/projects/analytics/2.jpeg",
            "assets/projects/analytics/3.jpeg"
        ],
    };

    let activeProjectGallery = null;
    let activeProjectIndex = 0;

    let projectModal;
    let projectModalImage;
    let projectModalDots;
    let projectModalClose;
    let projectModalPrev;
    let projectModalNext;

    document.addEventListener("DOMContentLoaded", () => {

        projectModal = document.getElementById("projectModal");
        projectModalImage = document.getElementById("projectModalImage");
        projectModalDots = document.getElementById("projectModalDots");
        projectModalClose = document.getElementById("projectModalClose");
        projectModalPrev = document.getElementById("projectModalPrev");
        projectModalNext = document.getElementById("projectModalNext");

        projectModalClose.addEventListener("click", closeProjectModal);

        projectModalPrev.addEventListener("click", showProjectPrev);

        projectModalNext.addEventListener("click", showProjectNext);

        let projectTouchStartX = 0;

        projectModalImage.addEventListener("touchstart", (e) => {
            projectTouchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        projectModalImage.addEventListener("touchend", (e) => {
            const projectTouchEndX = e.changedTouches[0].clientX;
            const diff = projectTouchStartX - projectTouchEndX;

            if (Math.abs(diff) < 50) return;

            if (diff > 0) {
                showProjectNext();
            } else {
                showProjectPrev();
            }
        }, { passive: true });

        projectModal.addEventListener("click", (e) => {

            if (e.target === projectModal) {
                closeProjectModal();
            }

        });

        document.addEventListener("keydown", (e) => {

            if (!projectModal.classList.contains("active")) return;

            if (e.key === "Escape") closeProjectModal();

            if (e.key === "ArrowLeft") showProjectPrev();

            if (e.key === "ArrowRight") showProjectNext();

        });

    });

    function renderProjectModal() {
        if (!activeProjectGallery) return;

        const images = galleries[activeProjectGallery];
        if (!images || !images.length) return;

        projectModalImage.src = images[activeProjectIndex];

        projectModalDots.innerHTML = "";
        images.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";

            if (index === activeProjectIndex) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {
                activeProjectIndex = index;
                renderProjectModal();
            });

            projectModalDots.appendChild(dot);
        });
    }

    function openProjectModal(galleryName, index) {
        activeProjectGallery = galleryName;
        activeProjectIndex = index;

        renderProjectModal();
        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showProjectPrev() {
        const images = galleries[activeProjectGallery];
        if (!images || !images.length) return;

        activeProjectIndex--;
        if (activeProjectIndex < 0) activeProjectIndex = images.length - 1;
        renderProjectModal();
    }

    function showProjectNext() {
        const images = galleries[activeProjectGallery];
        if (!images || !images.length) return;

        activeProjectIndex++;
        if (activeProjectIndex >= images.length) activeProjectIndex = 0;
        renderProjectModal();
    }
    document.querySelectorAll(".project-card").forEach(card => {

        const galleryName = card.dataset.gallery;
        if (!galleryName || !galleries[galleryName]) return;

        const images = galleries[galleryName];
        let current = 0;
        let ignoreClick = false;

        const image = card.querySelector(".gallery-image");
        const prev = card.querySelector(".prev");
        const next = card.querySelector(".next");
        const dots = card.querySelector(".gallery-dots");

        function render() {
            image.src = images[current];

            if (dots) {
                dots.innerHTML = "";
                images.forEach((_, index) => {
                    const dot = document.createElement("span");
                    if (index === current) dot.classList.add("active");
                    dot.addEventListener("click", (e) => {
                        e.stopPropagation();
                        current = index;
                        render();
                    });
                    dots.appendChild(dot);
                });
            }
        }

        function showPrev() {
            current--;
            if (current < 0) current = images.length - 1;
            render();
        }

        function showNext() {
            current++;
            if (current >= images.length) current = 0;
            render();
        }

        if (prev) prev.addEventListener("click", (e) => {
            e.stopPropagation();
            showPrev();
        });

        if (next) next.addEventListener("click", (e) => {
            e.stopPropagation();
            showNext();
        });

        card.addEventListener("click", (e) => {
            if (ignoreClick) return;
            if (e.target.closest(".prev")) return;
            if (e.target.closest(".next")) return;
            if (e.target.closest(".gallery-dots")) return;
            if (e.target.closest(".gallery-image")) {
                openProjectModal(galleryName, current);
            }
        });

        render();
    });

document.addEventListener("DOMContentLoaded", () => {
    const emailContact = document.getElementById("emailContact");
    if (!emailContact) return;

    emailContact.addEventListener("click", function(e){
        e.preventDefault();

        window.location.href =
            "mailto:emmanuel.solis159@gmail.com?subject=Contacto%20desde%20tu%20portafolio";

        setTimeout(() => {
            window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=emmanuel.solis159@gmail.com",
                "_blank"
            );
        }, 1000);
    });
});

/*
        Muestra información detallada
        de la tecnología seleccionada.
    */
    const techInfo = {

        kotlin:{
            title:"Kotlin",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Lenguaje moderno desarrollado por JetBrains y adoptado oficialmente por Google para Android.
                    Combina seguridad, claridad y productividad.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Es mi tecnología principal para crear aplicaciones Android nativas con arquitectura moderna,
                    pantallas limpias y lógica mantenible.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>DepotLink POS Mobile</li>
                    <li>PepsOCR</li>
                    <li>Taquería POS Android</li>
                </ul>
            `
        },

        android:{
            title:"Android Studio",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Entorno oficial de desarrollo para aplicaciones Android. Permite diseñar interfaces, depurar,
                    probar y generar versiones instalables.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo uso para construir aplicaciones Android desde cero, organizar pantallas, revisar errores y
                    preparar APKs listas para pruebas.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>DepotLink POS Mobile</li>
                    <li>PepsOCR</li>
                    <li>Taquería POS Android</li>
                </ul>
            `
        },

        room:{
            title:"Room Database",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Biblioteca de persistencia local para Android basada en SQLite. Simplifica el manejo de datos
                    offline con una capa más segura y ordenada.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    La uso para almacenar usuarios, productos, ventas, historial y configuraciones locales dentro
                    de mis aplicaciones.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>DepotLink POS Mobile</li>
                    <li>PepsOCR</li>
                    <li>Taquería POS Android</li>
                </ul>
            `
        },

        sqlite:{
            title:"SQLite",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Motor de base de datos ligero e integrado, ideal para aplicaciones locales y almacenamiento
                    estructurado sin depender de internet.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo como base de almacenamiento local para gestionar información de negocio, inventario,
                    pedidos y registros históricos.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>DepotLink POS Mobile</li>
                    <li>Smart POS</li>
                    <li>Taquería POS Android</li>
                </ul>
            `
        },

        mvvm:{
            title:"MVVM",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Arquitectura que separa interfaz, lógica y datos para crear aplicaciones más limpias, escalables
                    y fáciles de mantener.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo aplico en mis proyectos Android para organizar correctamente el código y facilitar el
                    crecimiento del sistema.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>DepotLink POS Mobile</li>
                    <li>Taquería POS Android</li>
                </ul>
            `
        },

        python:{
            title:"Python",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Lenguaje versátil utilizado para automatización, herramientas de escritorio, OCR, procesamiento
                    de datos y lógica de negocio.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para automatizar procesos, desarrollar herramientas y construir soluciones rápidas
                    para tareas operativas.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Taquería Yeshua POS</li>
                    <li>Smart POS</li>
                    <li>Automatizaciones propias</li>
                </ul>
            `
        },

        flet:{
            title:"Flet",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Framework que permite crear interfaces modernas con Python, ideal para prototipos y aplicaciones
                    visuales multiplataforma.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para construir aplicaciones con una interfaz limpia, práctica y enfocada en
                    productividad.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Taquería Yeshua POS</li>
                    <li>Smart POS</li>
                </ul>
            `
        },

        opencv:{
            title:"OpenCV",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Biblioteca de visión por computadora usada para procesar imágenes, detectar patrones y preparar
                    información visual.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo en tareas de procesamiento visual, OCR y manipulación de imágenes para análisis
                    automático.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>PepsOCR</li>
                    <li>Automatizaciones con imágenes</li>
                </ul>
            `
        },

        ocr:{
            title:"OCR",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Tecnología de reconocimiento óptico de caracteres que permite extraer texto de imágenes o
                    documentos escaneados.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para automatizar lectura de texto, reconocimiento de datos y captura de información
                    visual.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>PepsOCR</li>
                    <li>Procesos de captura automática</li>
                </ul>
            `
        },

        git:{
            title:"Git",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Sistema de control de versiones que permite registrar cambios, trabajar en ramas y mantener
                    historial de desarrollo.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo uso para organizar mis proyectos, controlar versiones y trabajar de forma ordenada en
                    actualizaciones.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Todos mis proyectos de código</li>
                </ul>
            `
        },

        github:{
            title:"GitHub",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Plataforma para alojar repositorios, colaborar con código y publicar proyectos de forma
                    profesional.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo uso para publicar mi portafolio, mostrar proyectos y mantener una presencia técnica pública.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Portafolio Profesional</li>
                    <li>DepotLink POS Mobile</li>
                    <li>PepsOCR</li>
                </ul>
            `
        },

        html:{
            title:"HTML",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Lenguaje de marcado utilizado para estructurar contenido en páginas web y aplicaciones web.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para construir la estructura base de sitios, secciones, formularios, modales y
                    componentes.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Portafolio Profesional</li>
                </ul>
            `
        },

        css:{
            title:"CSS",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Lenguaje encargado del diseño visual, animaciones, responsividad y estilo general de una
                    interfaz.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para crear la identidad visual del portafolio, efectos premium, animaciones y
                    adaptación móvil.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>Portafolio Profesional</li>
                </ul>
            `
        },

        firebase:{
            title:"Firebase",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Plataforma cloud de Google para autenticación, base de datos, sincronización y servicios
                    backend rápidos.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo en proyectos donde necesito sincronización, almacenamiento remoto o soporte
                    cloud.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>PepsOCR</li>
                    <li>DepotLink POS Mobile</li>
                </ul>
            `
        },

        mlkit:{
            title:"ML Kit",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Kit de inteligencia artificial de Google para reconocimiento de texto, rostros, códigos y
                    análisis visual.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para extraer información visual y automatizar tareas como lectura de texto y
                    detección de elementos.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>PepsOCR</li>
                </ul>
            `
        },

        restapi:{
            title:"REST API",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Arquitectura de comunicación entre aplicaciones mediante peticiones HTTP y respuestas
                    estructuradas.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para integrar servicios externos, conectar aplicaciones y obtener datos de forma
                    ordenada.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                    <li>Integraciones externas</li>
                </ul>
            `
        },

        json:{
            title:"JSON",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Formato ligero para intercambio de datos entre aplicaciones, APIs y servicios.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para enviar y recibir información entre frontend, backend y servicios externos.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                    <li>APIs REST</li>
                </ul>
            `
        },

        fetch:{
            title:"Fetch API",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Interfaz moderna de JavaScript para realizar solicitudes a APIs y servicios remotos.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para consumir datos, enviar peticiones y conectar el portafolio con servicios
                    externos.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                    <li>Portafolio Profesional</li>
                </ul>
            `
        },

        workers:{
            title:"Cloudflare Workers",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Plataforma serverless para ejecutar lógica backend sin administrar servidores tradicionales.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para automatizaciones, endpoints ligeros y funciones backend de alto rendimiento.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                </ul>
            `
        },

        kv:{
            title:"Cloudflare KV",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Almacenamiento distribuido clave-valor de Cloudflare para guardar información persistente de
                    forma rápida.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para guardar datos de conteo, configuraciones y variables persistentes en sistemas
                    serverless.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                </ul>
            `
        },

        cron:{
            title:"Cron Triggers",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Sistema de ejecución programada para correr tareas automáticas en horarios definidos.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para ejecutar tareas periódicas como reportes, sincronizaciones y automatizaciones.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                </ul>
            `
        },

        telegram:{
            title:"Telegram Bot API",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    API para crear bots y automatizar envíos de mensajes, alertas y notificaciones.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para mandar reportes automáticos, avisos y notificaciones de sistemas.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>EDEV Analytics</li>
                </ul>
            `
        },

        vision:{
            title:"Computer Vision",
            content:`
                <h4>¿Qué es?</h4>
                <p>
                    Rama de la inteligencia artificial enfocada en análisis visual, detección y comprensión de
                    imágenes.
                </p>

                <h4>¿Dónde lo utilizo?</h4>
                <p>
                    Lo utilizo para automatizar reconocimiento visual, lectura de documentos y análisis de
                    imágenes.
                </p>

                <h4>Proyectos relacionados</h4>
                <ul>
                    <li>PepsOCR</li>
                    <li>Automatizaciones con imágenes</li>
                </ul>
            `
        }

    };

    function openTechModal(tech){

        const modal =
            document.getElementById("techModal");

        if(!techInfo[tech]) return;

        document.getElementById(
            "modalTechTitle"
        ).innerHTML = techInfo[tech].title;

        document.getElementById(
            "modalTechContent"
        ).innerHTML = techInfo[tech].content;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }

    function closeTechModal(){

        document
            .getElementById("techModal")
            .classList.remove("active");

        document.body.style.overflow = "";
    }

    document.addEventListener("DOMContentLoaded", () => {

        const modal =
            document.getElementById("techModal");

        if(!modal) return;

        modal.addEventListener("click", (e) => {

            if(e.target === modal){

                closeTechModal();

            }

        });

        document.addEventListener("keydown", (e) => {

            if(e.key === "Escape"){

                closeTechModal();

            }

        });

        let techStartY = 0;

        modal.addEventListener("touchstart", (e) => {

            techStartY =
                e.changedTouches[0].clientY;

        });

        modal.addEventListener("touchend", (e) => {

            const endY =
                e.changedTouches[0].clientY;

            if(endY - techStartY > 100){

                closeTechModal();

            }

        });

    });


    /*
        Expande o contrae
        una tarjeta de soluciones.
    */
    function toggleService(type){

        const cards =
            document.querySelectorAll(".service-card");

        cards.forEach(card=>{

            if(card.getAttribute("data-type") !== type){
                card.classList.remove("active");
            }

        });

        const current =
            document.querySelector(`[data-type="${type}"]`);

        current.classList.toggle("active");

    }

/*
        Expande o contrae
        un elemento de la trayectoria.
    */
    function toggleTimeline(id){

        const items =
            document.querySelectorAll(".timeline-item");

        items.forEach(item=>{

            if(item.dataset.year !== id){
                item.classList.remove("active");
            }

        });

        const current =
            document.querySelector(`[data-year="${id}"]`);

        current.classList.toggle("active");
    }

/*
        Modal del logotipo EDev
        Permite ampliar el logo al hacer clic.
    */

    document.addEventListener("DOMContentLoaded", () => {

        const logo = document.getElementById("logoExpandible");
        const modal = document.getElementById("logoModal");

        if (!logo || !modal) return;

        logo.addEventListener("click", (e) => {

            e.stopPropagation();

            modal.classList.remove(
                "theme-green",
                "theme-purple"
            );

            if(
                document.body.dataset.theme ===
                "purple"
            ){

                modal.classList.add(
                    "theme-purple"
                );

            }else{

                modal.classList.add(
                    "theme-green"
                );

            }

            modal.classList.add("active");

        });

        modal.addEventListener("click", () => {
            modal.classList.remove("active");
        });

    });

/*
    Obtiene el contador de visitas
    desde Cloudflare Workers.
*/
async function loadVisits() {
    const visitCount = document.getElementById("visit-count");
    if (!visitCount) return;

    try {
        const response = await fetch(
            "https://portfolio-counter.emmanuel-solis159.workers.dev"
        );

        const data = await response.json();

        visitCount.textContent = data.visits.toLocaleString();
    } catch (error) {
        console.error(error);
        visitCount.textContent = "--";
    }
}

document.addEventListener("DOMContentLoaded", loadVisits);

document.addEventListener("DOMContentLoaded", () => {
        const revealItems = document.querySelectorAll(
            ".service-card, .about-card, .about-left, .about-right, .project-card, .timeline-item, .education-card, .contact-card, .section-header"
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(item => {
            item.classList.add("reveal");
            revealObserver.observe(item);
        });
    });

document.addEventListener("DOMContentLoaded", () => {
    const navOptions = document.getElementById("navOptions");
    const navbar = document.querySelector(".navbar");
    if (!navOptions || !navbar) return;

    let lastScroll = window.scrollY || 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 120) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }

        lastScroll = currentScroll;
    }, { passive: true });

    navOptions.addEventListener("click", () => {
        navbar.classList.toggle("open");
        navOptions.textContent = navbar.classList.contains("open") ? "✕" : "☰";
    });

    const navLinks = document.querySelectorAll(".nav-menu .nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            navOptions.textContent = "☰";
        });
    });

    const mobileCvBtn = document.querySelector(".nav-menu .cv-btn");
    if (mobileCvBtn) {
        mobileCvBtn.addEventListener("click", () => {
            navbar.classList.remove("open");
            navOptions.textContent = "☰";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-service]").forEach(card => {
        card.addEventListener("click", () => toggleService(card.dataset.service));
    });

    document.querySelectorAll("[data-tech]").forEach(item => {
        item.addEventListener("click", () => openTechModal(item.dataset.tech));
    });

    document.querySelectorAll("[data-timeline]").forEach(item => {
        item.addEventListener("click", () => toggleTimeline(item.dataset.timeline));
    });

    const techClose = document.querySelector("[data-tech-close]");
    if (techClose) {
        techClose.addEventListener("click", closeTechModal);
    }
});

