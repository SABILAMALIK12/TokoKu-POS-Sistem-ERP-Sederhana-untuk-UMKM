const API_URL = 'http://localhost:3000';

async function handleGoogleLogin(response) {
    const result = await fetch(`${API_URL}/api/v1/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    });

    const data = await result.json();

    if (result.ok) {
        localStorage.setItem('token', data.token);
        document.getElementById('login-hasil').innerText = `Login Google berhasil, role: ${data.role}`;
    } else {
        document.getElementById('login-hasil').innerText = data.message;
    }
}