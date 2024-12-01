///PRUEBA, WIP, ITD BE MODIFIED LATER:

const jwt = require('jsonwebtoken');

// Secreto para firmar el token
const secretKey = 'tu_clave_secreta';

// Generar un token (por ejemplo, después de autenticar al usuario)
function generateToken(user) {
  const payload = { id: user.id, username: user.username }; // Datos del usuario que quieres incluir en el token
  const options = { expiresIn: '1h' }; // El token expirará en 1 hora

  // Generar y devolver el token
  const token = jwt.sign(payload, secretKey, options);
  return token;
}
