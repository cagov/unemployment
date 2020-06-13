const axios = require("axios");

class ReCaptcha {
  constructor(userToken) {
    this.userToken = userToken;
    this.url = "https://www.google.com/recaptcha/api/siteverify";
    this.secret = process.env.RECAPTCHA_SECRET;
  }

  async validateUser() {
    const googleResponse = await this.askGoogle();
    return googleResponse.data.success;
  }

  async askGoogle() {
    const postUrl = `${this.url}?secret=${this.secret}&response=${this.userToken}`;

    // TODO: Add error handling
    const response = await axios.post(postUrl, {});

    return response;
  }
}

module.exports = ReCaptcha;
