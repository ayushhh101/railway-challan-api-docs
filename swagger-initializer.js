window.onload = function() {
  // Initialize SwaggerUI to load the external YAML file
  window.ui = SwaggerUIBundle({
    url: './railyway-challan-api.yaml',
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
    validatorUrl: null,
    tryItOutEnabled: true,
    filter: true,
    displayRequestDuration: true,
    docExpansion: "list",
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    showExtensions: true,
    showCommonExtensions: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'],
    onComplete: function() {
      console.log("🚂 Railway Challan API Documentation loaded successfully!");
    },
    onFailure: function(err) {
      console.error("❌ Failed to load API documentation:", err);
      // Fallback message for users
      const container = document.getElementById('swagger-ui');
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
            <h2>🚂 Railway Challan API Documentation</h2>
            <p style="color: #d32f2f;">Failed to load API specification.</p>
            <p>Please ensure the <code>railyway-challan-api.yaml</code> file is accessible.</p>
            <p>Error: ${err.message || 'Unknown error'}</p>
          </div>
        `;
      }
    }
  });
};
     