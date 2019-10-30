export function getToken() {
  return localStorage.token
}


export function setToken(token) {
  return localStorage.setItem('token', token)
}


export function removeToken() {
  return localStorage.removeItem('token')
}


export function getPhone() {
  return localStorage.phone;
}


export function setPhone(phone) {
  return localStorage.setItem('phone', phone);
}


export function removePhone() {
  return localStorage.removeItem('phone');
}


export function getuserId(){
  return localStorage.userId;
}


export function setuserId(userId) {
  return localStorage.setItem('userId', userId);
}


export function removeuserId() {
  return localStorage.removeItem('userId');
}
