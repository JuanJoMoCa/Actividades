// Esperamos a que el HTML cargue completo
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Variables globales ---
    let scrollPrincipal = document.getElementById('scroll-principal');
    let margenArrastre = 5; // Píxeles para diferenciar un click de un arrastre

    // --- 2. Arrastre vertical ---
    let clickY = false;
    let arrastrandoY = false;
    let inicioY = 0;
    let scrollTopInicial = 0;
    let idPunteroY = null;

    scrollPrincipal.addEventListener('pointerdown', (e) => {
        // Asegurarnos de que sea el click izquierdo del mouse
        if (e.pointerType === 'mouse' && e.button === 0) {
            let objetivo = e.target;
            
            // Evitamos conflicto si arrastran desde los carruseles o etiquetas
            let ignorar = objetivo.closest('.carrusel') || objetivo.closest('.caja-etiqueta');

            if (!ignorar) {
                clickY = true;
                arrastrandoY = false;
                idPunteroY = e.pointerId;
                inicioY = e.clientY;
                scrollTopInicial = scrollPrincipal.scrollTop;
            }
        }
    });

    scrollPrincipal.addEventListener('pointermove', (e) => {
        if (clickY && e.pointerId === idPunteroY) {
            let difY = e.clientY - inicioY;

            if (!arrastrandoY) {
                if (Math.abs(difY) >= margenArrastre) {
                    arrastrandoY = true;
                    scrollPrincipal.classList.add('arrastrando');
                    scrollPrincipal.setPointerCapture(idPunteroY);
                }
            } else {
                scrollPrincipal.scrollTop = scrollTopInicial - (difY * 1.5);
            }
        }
    });

    const soltarY = (e) => {
        if (clickY && e.pointerId === idPunteroY) {
            clickY = false;
            
            if (arrastrandoY) {
                scrollPrincipal.classList.remove('arrastrando');
                if (scrollPrincipal.hasPointerCapture(idPunteroY)) {
                    scrollPrincipal.releasePointerCapture(idPunteroY);
                }
                // Prevenir click fantasma tras soltar el arrastre
                scrollPrincipal.addEventListener('click', (ev) => ev.stopPropagation(), { capture: true, once: true });
            }
            arrastrandoY = false;
        }
    };

    scrollPrincipal.addEventListener('pointerup', soltarY);
    scrollPrincipal.addEventListener('pointercancel', soltarY);


    // --- 3. Arrastre horizontal (Carruseles) ---
    let carruseles = document.querySelectorAll('.arrastrable');
    
    carruseles.forEach((carrusel) => {
        let clickX = false;
        let arrastrandoX = false;
        let inicioX = 0;
        let scrollLeftInicial = 0;
        let idPunteroX = null;

        carrusel.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button === 0) {
                clickX = true;
                arrastrandoX = false;
                idPunteroX = e.pointerId;
                inicioX = e.clientX;
                scrollLeftInicial = carrusel.scrollLeft;
            }
        });

        carrusel.addEventListener('pointermove', (e) => {
            if (clickX && e.pointerId === idPunteroX) {
                let difX = e.clientX - inicioX;

                if (!arrastrandoX) {
                    if (Math.abs(difX) >= margenArrastre) {
                        arrastrandoX = true;
                        carrusel.classList.add('arrastrando');
                        carrusel.setPointerCapture(idPunteroX);
                    }
                } else {
                    carrusel.scrollLeft = scrollLeftInicial - (difX * 1.5);
                }
            }
        });

        const soltarX = (e) => {
            if (clickX && e.pointerId === idPunteroX) {
                clickX = false;
                
                if (arrastrandoX) {
                    carrusel.classList.remove('arrastrando');
                    if (carrusel.hasPointerCapture(idPunteroX)) {
                        carrusel.releasePointerCapture(idPunteroX);
                    }
                    carrusel.addEventListener('click', (ev) => ev.stopPropagation(), { capture: true, once: true });
                }
                arrastrandoX = false;
            }
        };

        carrusel.addEventListener('pointerup', soltarX);
        carrusel.addEventListener('pointercancel', soltarX);
    });


    // --- 4. Botones del carrusel: Ciencias ---
    let pistaCien = document.getElementById('pista-cien');
    let btnIzqCien = document.getElementById('btn-izq-cien');
    let btnDerCien = document.getElementById('btn-der-cien');

    btnIzqCien.addEventListener('click', () => {
        let paso = Math.max(pistaCien.clientWidth * 0.8, 200);
        pistaCien.scrollBy({ left: -paso, behavior: 'smooth' });
    });

    btnDerCien.addEventListener('click', () => {
        let paso = Math.max(pistaCien.clientWidth * 0.8, 200);
        pistaCien.scrollBy({ left: paso, behavior: 'smooth' });
    });

    const revisarFlechasCien = () => {
        let maxScroll = pistaCien.scrollWidth - pistaCien.clientWidth;
        
        // Operadores ternarios para ocultar/mostrar flechas en 1 línea
        pistaCien.scrollLeft <= 1 ? btnIzqCien.classList.add('oculto') : btnIzqCien.classList.remove('oculto');
        pistaCien.scrollLeft >= maxScroll - 1 ? btnDerCien.classList.add('oculto') : btnDerCien.classList.remove('oculto');
    };

    pistaCien.addEventListener('scroll', revisarFlechasCien);
    window.addEventListener('resize', revisarFlechasCien);
    revisarFlechasCien(); // Check inicial


    // --- 5. Botones del carrusel: Tecnología ---
    let pistaTec = document.getElementById('pista-tec');
    let btnIzqTec = document.getElementById('btn-izq-tec');
    let btnDerTec = document.getElementById('btn-der-tec');

    btnIzqTec.addEventListener('click', () => {
        let paso = Math.max(pistaTec.clientWidth * 0.8, 200);
        pistaTec.scrollBy({ left: -paso, behavior: 'smooth' });
    });

    btnDerTec.addEventListener('click', () => {
        let paso = Math.max(pistaTec.clientWidth * 0.8, 200);
        pistaTec.scrollBy({ left: paso, behavior: 'smooth' });
    });

    const revisarFlechasTec = () => {
        let maxScroll = pistaTec.scrollWidth - pistaTec.clientWidth;
        
        pistaTec.scrollLeft <= 1 ? btnIzqTec.classList.add('oculto') : btnIzqTec.classList.remove('oculto');
        pistaTec.scrollLeft >= maxScroll - 1 ? btnDerTec.classList.add('oculto') : btnDerTec.classList.remove('oculto');
    };

    pistaTec.addEventListener('scroll', revisarFlechasTec);
    window.addEventListener('resize', revisarFlechasTec);
    revisarFlechasTec();


    // --- 6. Botones verticales del scroll lateral (Arriba/Abajo) ---
    let btnArriba = document.getElementById('btn-arriba');
    let btnAbajo = document.getElementById('btn-abajo');

    btnArriba.addEventListener('click', () => {
        let salto = scrollPrincipal.clientHeight * 0.6;
        scrollPrincipal.scrollBy({ top: -salto, behavior: 'smooth' });
    });

    btnAbajo.addEventListener('click', () => {
        let salto = scrollPrincipal.clientHeight * 0.6;
        scrollPrincipal.scrollBy({ top: salto, behavior: 'smooth' });
    });


    // --- 7. Lógica de la barra lateral custom (Scrollbar) ---
    let pistaLateral = document.getElementById('pista-lateral');
    let agarradera = document.getElementById('agarradera-scroll');

    const moverAgarradera = () => {
        let maxScrollObj = scrollPrincipal.scrollHeight - scrollPrincipal.clientHeight;
        let recorridoAgarradera = Math.max(pistaLateral.clientHeight - agarradera.offsetHeight, 0);

        if (maxScrollObj > 0) {
            let porcentaje = scrollPrincipal.scrollTop / maxScrollObj;
            agarradera.style.top = `${porcentaje * recorridoAgarradera}px`;
        } else {
            agarradera.style.top = '0px';
        }
    };

    scrollPrincipal.addEventListener('scroll', moverAgarradera);
    window.addEventListener('resize', moverAgarradera);
    agarradera.addEventListener('load', moverAgarradera);
    moverAgarradera();


    // --- 8. Arrastrar la agarradera del scroll manualmente ---
    let estadoAgarradera = null;

    agarradera.addEventListener('pointerdown', (e) => {
        agarradera.setPointerCapture(e.pointerId);
        let topActual = parseFloat(agarradera.style.top) || 0;

        estadoAgarradera = { y: e.clientY, top: topActual };
        e.preventDefault();
    });

    agarradera.addEventListener('pointermove', (e) => {
        if (estadoAgarradera) {
            let recorridoAgarradera = pistaLateral.clientHeight - agarradera.offsetHeight;

            if (recorridoAgarradera > 0) {
                let difMouse = e.clientY - estadoAgarradera.y;
                let nuevoTop = estadoAgarradera.top + difMouse;

                // Limitar para que no se salga de la pista ni por arriba ni por abajo
                nuevoTop = Math.max(0, Math.min(nuevoTop, recorridoAgarradera));

                let maxScrollObj = scrollPrincipal.scrollHeight - scrollPrincipal.clientHeight;
                let porcentaje = nuevoTop / recorridoAgarradera;
                
                scrollPrincipal.scrollTop = porcentaje * maxScrollObj;
            }
        }
    });

    const soltarAgarradera = () => estadoAgarradera = null;
    agarradera.addEventListener('pointerup', soltarAgarradera);
    agarradera.addEventListener('pointercancel', soltarAgarradera);


    // --- 9. Click en la pista para saltar rápido ---
    pistaLateral.addEventListener('pointerdown', (e) => {
        if (e.target !== agarradera) {
            let rectPista = pistaLateral.getBoundingClientRect();
            let recorridoAgarradera = pistaLateral.clientHeight - agarradera.offsetHeight;

            if (recorridoAgarradera > 0) {
                let clickY = e.clientY - rectPista.top;
                let nuevoTop = clickY - (agarradera.offsetHeight / 2);

                // Limitar límites
                nuevoTop = Math.max(0, Math.min(nuevoTop, recorridoAgarradera));

                let maxScrollObj = scrollPrincipal.scrollHeight - scrollPrincipal.clientHeight;
                let porcentaje = nuevoTop / recorridoAgarradera;
                
                scrollPrincipal.scrollTo({ 
                    top: porcentaje * maxScrollObj, 
                    behavior: 'smooth' 
                });
            }
        }
    });

});