export async function checkLogin() {
  const user = await getUserData();
  return user; 
}

export async function getUserData() {
  const response = await fetch('../json/user.json');
  const data = await response.json();
  return data;
}

export function logout() {
  localStorage.removeItem('token'); 
}

export async function login(email, password) {
  const response = await fetch('https://guessing-project.onrender.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (result.success) {
    setLocalStorage('user', result.user);
  }

  return result;
}

