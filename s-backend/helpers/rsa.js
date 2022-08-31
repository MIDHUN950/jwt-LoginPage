const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

const PassPhrase = "Top secret.";

const Bits = 1024;

const encryptWithRSA = (input, publickey) => {
    const buffer = Buffer.from(input, 'utf-8');
    const encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
}

const decryptWithRSA = function (input, privatekey) {
    const buffer = Buffer.from(input, 'base64');
    const decrypted = privateDecrypt(
        {
            key: privatekey,
            passphrase: PassPhrase,
        },
        buffer,
    )
    return decrypted.toString("utf8");
};

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: Bits,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: PassPhrase
    }
});

