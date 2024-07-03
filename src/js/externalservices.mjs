export async function authenticateUser(email, password) {
    if (email === 'user@example.com' && password === 'password123') {
        const token = {
            token: 'dummyToken123',
            expiry: new Date().getTime() + 3600 * 1000,
            user: {
                email: email,
                lastScore: 80,
                topScores: [90, 85, 80],
                topMissedQuestions: ["Question 1", "Question 2", "Question 3"]
            }
        };
        return token;
    } else {
        throw new Error('Invalid email or password');
    }
}

export async function fetchTopScore() {
    // Simulando la obtención del puntaje más alto de todos los usuarios
    return 95;
}