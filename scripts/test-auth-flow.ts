
async function main() {
    const baseUrl = 'http://localhost:3000/api/auth';
    const email = `user_${Date.now()}@example.com`;
    const password = 'password123';

    console.log(`\n1. Registering user: ${email}`);
    const registerRes = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: 'Test User' }),
    });

    const registerData = await registerRes.json();
    console.log('Register Status:', registerRes.status);
    console.log('Register Response:', JSON.stringify(registerData, null, 2));

    if (!registerRes.ok) process.exit(1);

    console.log(`\n2. Logging in user: ${email}`);
    const loginRes = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status);
    // console.log('Login Response:', JSON.stringify(loginData, null, 2));

    const cookie = loginRes.headers.get('set-cookie');
    console.log('Set-Cookie Header:', cookie ? 'Present' : 'Missing');

    if (!loginRes.ok) process.exit(1);

    // Get token from response (since we are in node, we can't auto-use cookies like browser, but api returns it in body too?)
    // AuthHandler.login returns `result` which has `token`.
    const token = loginData.data.token;

    console.log(`\n3. Getting Current User (Me)`);
    const meRes = await fetch(`${baseUrl}/me`, {
        method: 'GET',
        headers: {
            'Cookie': `token=${token}`,
            'x-user-id': loginData.data.user.id // Middleware sets this, but here we perform direct request.
            // Wait, middleware won't run on localhost direct fetch unless I go through the Next.js server properly.
            // But I am hitting localhost:3000, so middleware SHOULD run.
            // Middleware validates cookie 'token' and sets 'x-user-id' header.
            // So simply passing Cookie header should be enough.
        },
    });

    const meData = await meRes.json();
    console.log('Me Status:', meRes.status);
    console.log('Me Response:', JSON.stringify(meData, null, 2));

    console.log(`\n4. Logging out`);
    const logoutRes = await fetch(`${baseUrl}/logout`, {
        method: 'POST',
    });
    console.log('Logout Status:', logoutRes.status);
    const logoutCookie = logoutRes.headers.get('set-cookie');
    console.log('Logout Set-Cookie:', logoutCookie);
}

main();
