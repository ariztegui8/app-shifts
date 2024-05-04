export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    fechaNueva.setMinutes(fechaNueva.getMinutes() + fechaNueva.getTimezoneOffset());  // Ajuste a UTC
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    return fechaNueva.toLocaleDateString('es-ES', opciones);
};