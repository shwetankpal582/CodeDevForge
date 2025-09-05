// Environment validation script
console.log('Validating environment variables...');

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

let missingVars = [];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        missingVars.push(envVar);
    }
});

if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    console.error('Please set these variables in your Railway dashboard');
    process.exit(1);
}

console.log('All required environment variables are present');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✓ Present' : '✗ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✓ Present' : '✗ Missing');
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('CLIENT_URL:', process.env.CLIENT_URL || 'Not set');













