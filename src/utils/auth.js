const TOKEN_KEY = "fake_jwt_token";

export function login(email, password) {
  // Create a tiny fake token
  const token = {
    token: "fake-jwt." + btoa(email || "anon"),
    user: { email: email || "user@example.com" ,
      password: password || "password"
    }
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  return token;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}
