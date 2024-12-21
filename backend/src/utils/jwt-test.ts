import * as process from 'node:process';

console.log('JWT_SECRET (Global):', process.env.JWT_SECRET);
console.log('JWT_EXPIRES_IN (Global):', process.env.JWT_EXPIRES_IN);
