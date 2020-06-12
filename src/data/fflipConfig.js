/**
 * Feature and experiment flags.
 * https://github.com/FredKSchott/fflip
 */
const fflipConfig = {
  features: [
    {
      id: "retroCerts",
      description: "Allows users to retroactively certify.",
      enabled: false,
    },
  ],
  criteria: [],
};

module.exports = fflipConfig;
