const crypto = require("crypto");

// Generate a 64-byte secret key in base64
const secretKey = crypto.randomBytes(64).toString("hex");
console.log("JWT Secret Key:", secretKey);
