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
    const postData = {};
    // The 99th percentile of requests takes 128ms. 2s should be plenty of time.
    const timeoutMs = 2 * 1000;
    const numAttempts = 3;
    const config = {
      timeout: timeoutMs,
    };

    let axiosError = null;
    for (let i = 0; i < numAttempts; ++i) {
      try {
        const response = await axios.post(postUrl, postData, config);
        return response;
      } catch (e) {
        // There was a timeout or some other error. Try again.
        axiosError = e;
      }
    }
    throw axiosError;
  }
}

module.exports = ReCaptcha;
