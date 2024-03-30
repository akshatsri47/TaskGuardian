import { randomBytes } from 'crypto';

// Generate a random secret key
const generateSecretKey = () => {
  const secretKey = randomBytes(32).toString('hex');
  return secretKey;
};

// Usage
const secretKey = generateSecretKey();
console.log(secretKey);
