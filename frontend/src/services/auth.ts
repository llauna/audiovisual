export async function register(nombre: string, email: string, password: string) {
    const res = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
    });
    return res.json();
}

export async function login(email: string, password: string) {
    const res = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
    return data;
}

export function getToken() {
    return localStorage.getItem('token');
}

export function logout() {
    localStorage.removeItem('token');
}
