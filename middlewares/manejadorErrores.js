// middleware para manejar errores en la aplicación
export const manejadorErrores = (error, req, res, next) =>{

    // extraigo el statusCode y el mensaje de error, si no existen, les asigno valores por defecto

    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Ha ocurrido un error inesperado!"

    console.error("\x1b[31m", `Error: (${statusCode}):`,error.stack)

    return res.status(statusCode).json({error: errorMessage})
}