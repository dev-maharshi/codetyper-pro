import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user); 
  if (!user || !user.token) return null;
  console.log(user.token);

  try {
    const decoded = jwtDecode(user.token);
    console.log(decoded);
    return decoded.userId; 
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}; 