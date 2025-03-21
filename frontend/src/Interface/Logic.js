export function generateKey() {
    const chars = " " + "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" + "0123456789" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let charsArray = chars.split("");
    let keyArray = [...charsArray];
    
    for (let i = keyArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keyArray[i], keyArray[j]] = [keyArray[j], keyArray[i]];
    }
    return { charsArray, keyArray };
}

export function encrypt(plainText, charsArray, keyArray) {
    return plainText.split('').map(char => {
        let index = charsArray.indexOf(char);
        return index !== -1 ? keyArray[index] : char;
    }).join('');
}

export function decrypt(cipherText, charsArray, keyArray) {
    return cipherText.split('').map(char => {
        let index = keyArray.indexOf(char);
        return index !== -1 ? charsArray[index] : char;
    }).join('');
}