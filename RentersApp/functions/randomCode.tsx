export default function generateRandomCode(length: number) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
  
    for (var i = 0; i < length; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }