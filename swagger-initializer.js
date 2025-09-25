window.onload = function() {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    url: './railway-challan-api.yaml',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout",
    validatorUrl: null, // Disable validator
    tryItOutEnabled: true, // Enable "Try it out" button
    displayRequestDuration: true, // Show request duration
    filter: true, // Enable search filter
    supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
    onComplete: function() {
      // Custom styling after load
      console.log('Railway Challan API Documentation Loaded');
    }
  });

  //</editor-fold>
};
