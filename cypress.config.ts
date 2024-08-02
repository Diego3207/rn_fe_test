import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    //baseUrl: "http://localhost:4200",
    baseUrl: "http://localhost:4200/#",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    viewportHeight:1080,
    viewportWidth:1600,
    reporterOptions: {
      charts: true,
      reportPageTitle: 'Testing',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
});
