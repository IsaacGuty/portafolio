document.addEventListener("DOMContentLoaded", function () {
    console.log("Iniciando Validación de Formulario");

    const form = document.getElementById("formulario-contacto");
    const errorContainer = document.createElement("div"); // Contenedor de errores
    errorContainer.style.color = "red";
    errorContainer.style.fontSize = "14px";
    errorContainer.style.marginTop = "20px";
    errorContainer.style.border = "1px solid red";
    errorContainer.style.padding = "10px";
    errorContainer.style.display = "none"; // Inicialmente oculto
    form.insertBefore(errorContainer, form.firstChild); // Insertar antes del formulario

    const mensajeExito = document.getElementById("mensaje-exito"); // Mensaje de éxito

    // Función para validar correos electrónicos (dominios específicos)
    function validarCorreo(correo) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|icloud\.com|gmail\.es|yahoo\.es|hotmail\.es|icloud\.es)$/;
        return emailRegex.test(correo);
    }

    // Función para validar números de teléfono con prefijo +504 (Honduras)
    function validarTelefono(telefono) {
        const phoneRegex = /^\+504[2389]\d{7}$/; // Acepta +504 y número de 8 dígitos
        return phoneRegex.test(telefono);
    }

    // Mostrar mensaje de error debajo de cada input
    function mostrarError(input, mensaje) {
        input.style.outline = "2px solid red";

        let errorMensaje = input.nextElementSibling;
        if (!errorMensaje || errorMensaje.tagName !== "SPAN") {
            errorMensaje = document.createElement("span");
            errorMensaje.style.color = "red";
            errorMensaje.style.fontSize = "12px";
            input.parentNode.insertBefore(errorMensaje, input.nextSibling);
        }
        errorMensaje.textContent = mensaje;
    }

    // Limpiar errores
    function limpiarError(input) {
        input.style.outline = "";
        const errorMensaje = input.nextElementSibling;
        if (errorMensaje && errorMensaje.tagName === "SPAN") {
            errorMensaje.remove();
        }
    }

    // Validación al enviar
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Validando formulario...");

        // Limpiar contenedor de errores antes de agregar nuevos
        errorContainer.innerHTML = "";
        errorContainer.style.display = "none"; // Ocultar contenedor de errores
        mensajeExito.style.display = "none"; // Ocultar mensaje de éxito
        let bolFormularioValido = true;

        // Campos a validar
        const campos = [
            { 
                id: "nombre", 
                validacion: (valor) => valor.trim() !== "", 
                mensaje: "El nombre no puede estar vacío." 
            },
            { 
                id: "telefono", 
                validacion: validarTelefono, 
                mensaje: "El teléfono debe iniciar con +504 y tener 8 dígitos, comenzando con 2, 3, 8 o 9." 
            },
            { 
                id: "correo", 
                validacion: validarCorreo, 
                mensaje: "El correo debe tener un formato válido y pertenecer a los dominios permitidos (gmail, yahoo, hotmail, icloud) con extensión .com o .es." 
            },
            { 
                id: "mensaje", 
                validacion: (valor) => valor.trim() !== "", 
                mensaje: "El mensaje no puede estar vacío." 
            },
        ];

        // Validar cada campo
        campos.forEach(function (campo) {
            const input = document.getElementById(campo.id);
            const esValido = campo.validacion(input.value);
            if (!esValido) {
                mostrarError(input, campo.mensaje);
                errorContainer.style.display = "block"; // Mostrar el contenedor de errores
                errorContainer.innerHTML += `<p>${campo.mensaje}</p>`; // Agregar el mensaje de error al contenedor
                bolFormularioValido = false;
            } else {
                limpiarError(input);
            }
        });

        // Enviar formulario si es válido
        if (bolFormularioValido) {
            console.log("Formulario válido. Mostrando mensaje de éxito...");
            mensajeExito.style.display = "block";
            form.reset(); 
        } else {
            console.log("Errores encontrados. Corrige antes de enviar.");
        }
    });
});