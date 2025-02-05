/* function generateShortId(bigurl,length=8){
    const bigURL=bigurl;
    let result="";
    for(i=0;i<length;i++){
      result +=bigURL.charAt(Math.floor(Math.random() * bigURL.length))
    }
    return result;
  }
  module.exports={
    generateShortId
  } */
    const crypto = require("crypto");

    function generateShortId(length = 8) {
      return crypto.randomBytes(length).toString("base64url").slice(0, length);
    }
    
    module.exports = {
      generateShortId,
    };