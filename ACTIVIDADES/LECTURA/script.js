// Siempre nos aseguramos de que el DOM cargue completo por si las dudas
document.addEventListener('DOMContentLoaded', function() {

    let anchoOriginalEscenario = 978;
    let altoOriginalEscenario = 407;
    
    // Capturamos el elemento con el ID que le pusimos en el HTML
    let contenedorEscenario = document.getElementById("stage");

    function ajustarEscalaPantalla() {
        // 1. Obtenemos las medidas actuales de la ventana del navegador
        let anchoVentana = window.innerWidth;
        let altoVentana = window.innerHeight;

        // 2. Calculamos qué porcentaje representa la ventana sobre el tamaño original
        let proporcionAncho = anchoVentana / anchoOriginalEscenario;
        let proporcionAlto = altoVentana / altoOriginalEscenario;

        // 3. Variable donde guardaremos el resultado ganador
        let escalaDefinitiva = 1;

        // 4. Lógica para decidir qué lado nos limita (usamos IF en vez de Math.min)
        if (proporcionAncho < proporcionAlto) {
            // Si el ancho es más pequeño proporcionalmente, nos regimos por el ancho
            escalaDefinitiva = proporcionAncho;
        } else {
            // Si el alto es más pequeño, nos regimos por el alto
            escalaDefinitiva = proporcionAlto;
        }

        // 5. Aplicamos el estilo de transformación concatenando strings a la antigua
        if (contenedorEscenario !== null) {
            contenedorEscenario.style.transform = "scale(" + escalaDefinitiva + ")";
        }
    }

    // Cuando el usuario cambie el tamaño de la ventana (resize), recalculamos
    window.addEventListener("resize", function() {
        ajustarEscalaPantalla();
    });

    // Llamamos la función una vez al inicio para que se ajuste al cargar la página
    ajustarEscalaPantalla();

});