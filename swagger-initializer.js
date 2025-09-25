window.onload = function() {
  // Embed the spec directly to avoid 404 errors
  const spec = {
    "openapi": "3.0.0",
    "info": {
      "title": "🚂 Railway Challan API",
      "version": "1.0.0",
      "description": "Professional Railway Challan Management System API with comprehensive validation, security, and monitoring features.",
      "contact": {
        "name": "API Support",
        "email": "support@railwaychallan.com"
      }
    },
    "servers": [
      {
        "url": "http://localhost:5000",
        "description": "Development server"
      },
      {
        "url": "https://railway-challan-api.onrender.com",
        "description": "Production server"
      }
    ],
    "paths": {
      "/api/auth/register": {
        "post": {
          "summary": "Register a new user (Admin only)",
          "description": "Allows an admin to register a new user. Requires JWT authentication and admin privileges.",
          "tags": ["🔐 Authentication"],
          "security": [{"bearerAuth": []}],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": ["username", "password", "role", "zone"],
                  "properties": {
                    "username": {"type": "string", "example": "admin"},
                    "password": {"type": "string", "format": "password", "example": "password123"},
                    "role": {"type": "string", "enum": ["admin", "tte", "passenger"], "example": "admin"},
                    "zone": {"type": "string", "example": "North"}
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "message": {"type": "string", "example": "User registered successfully"}
                    }
                  }
                }
              }
            },
            "400": {"$ref": "#/components/responses/BadRequest"},
            "401": {"$ref": "#/components/responses/Unauthorized"},
            "403": {"$ref": "#/components/responses/Forbidden"}
          }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "Login user",
          "description": "Authenticates a user and returns JWT tokens.",
          "tags": ["🔐 Authentication"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": ["employeeId", "password"],
                  "properties": {
                    "employeeId": {"type": "string", "example": "TTE12345"},
                    "password": {"type": "string", "format": "password", "example": "password123"}
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "data": {
                        "type": "object",
                        "properties": {
                          "token": {"type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."},
                          "user": {
                            "type": "object",
                            "properties": {
                              "name": {"type": "string", "example": "John Doe"},
                              "employeeId": {"type": "string", "example": "TTE12345"},
                              "role": {"type": "string", "example": "tte"}
                            }
                          }
                        }
                      },
                      "message": {"type": "string", "example": "Login successful"}
                    }
                  }
                }
              }
            },
            "400": {"$ref": "#/components/responses/BadRequest"},
            "401": {"$ref": "#/components/responses/Unauthorized"}
          }
        }
      },
      "/api/auth/refresh": {
        "post": {
          "summary": "Refresh authentication token",
          "description": "Returns a new access token using a valid refresh token.",
          "tags": ["🔐 Authentication"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": ["refreshToken"],
                  "properties": {
                    "refreshToken": {"type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Token refreshed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "data": {
                        "type": "object",
                        "properties": {
                          "token": {"type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
                        }
                      },
                      "message": {"type": "string", "example": "Token refreshed successfully"}
                    }
                  }
                }
              }
            },
            "400": {"$ref": "#/components/responses/BadRequest"},
            "401": {"$ref": "#/components/responses/Unauthorized"}
          }
        }
      },
      "/api/auth/logout": {
        "post": {
          "summary": "Logout user",
          "description": "Logs out the user and invalidates the refresh token.",
          "tags": ["🔐 Authentication"],
          "responses": {
            "200": {
              "description": "Logout successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "message": {"type": "string", "example": "Logout successful"}
                    }
                  }
                }
              }
            },
            "401": {"$ref": "#/components/responses/Unauthorized"}
          }
        }
      },
      "/api/admin/dashboard": {
        "get": {
          "summary": "Get admin dashboard statistics",
          "description": "Retrieve comprehensive dashboard analytics and statistics.",
          "tags": ["👨‍💼 Admin Management"],
          "security": [{"bearerAuth": []}],
          "responses": {
            "200": {
              "description": "Dashboard statistics retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "data": {
                        "type": "object",
                        "properties": {
                          "totalChallans": {"type": "integer", "example": 1200},
                          "totalUsers": {"type": "integer", "example": 300},
                          "totalRevenue": {"type": "number", "example": 650000},
                          "monthlyGrowth": {"type": "number", "example": 12.5}
                        }
                      },
                      "message": {"type": "string", "example": "Dashboard statistics retrieved successfully"}
                    }
                  }
                }
              }
            },
            "401": {"$ref": "#/components/responses/Unauthorized"},
            "403": {"$ref": "#/components/responses/Forbidden"}
          }
        }
      },
      "/api/challan/issue": {
        "post": {
          "summary": "Issue a new challan (TTE only)",
          "description": "Allows a TTE to issue a new challan with proof files and validation.",
          "tags": ["📋 Challan Management"],
          "security": [{"bearerAuth": []}],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": ["trainNumber", "passengerName", "reason", "fineAmount", "location"],
                  "properties": {
                    "trainNumber": {"type": "string", "example": "12345"},
                    "coachNumber": {"type": "string", "example": "S2"},
                    "passengerName": {"type": "string", "example": "Ravi Sharma"},
                    "passengerAadharLast4": {"type": "string", "example": "1234"},
                    "mobileNumber": {"type": "string", "example": "+919812345678"},
                    "reason": {
                      "type": "string",
                      "enum": [
                        "Travelling without proper pass/ticket",
                        "Travelling Fraudulently", 
                        "Alarm Chain Pulling",
                        "Coach Reserved for Handicapped",
                        "Travelling on Roof Top",
                        "Trespassing",
                        "Nuisance and Littering"
                      ],
                      "example": "Travelling without proper pass/ticket"
                    },
                    "fineAmount": {"type": "number", "example": 500},
                    "location": {"type": "string", "example": "New Delhi Railway Station"},
                    "paymentMode": {"type": "string", "enum": ["online", "offline"], "example": "online"},
                    "proofs": {
                      "type": "array",
                      "items": {"type": "string", "format": "binary"},
                      "description": "Upload up to 4 proof files"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Challan issued successfully",
              "content": {
                "application/json": {
                  "schema": {"$ref": "#/components/schemas/ChallanResponse"}
                }
              }
            },
            "400": {"$ref": "#/components/responses/BadRequest"},
            "401": {"$ref": "#/components/responses/Unauthorized"},
            "403": {"$ref": "#/components/responses/Forbidden"}
          }
        }
      },
      "/api/challan/admin/all": {
        "get": {
          "summary": "View all challans (Admin only)",
          "description": "Retrieve all challans in the system with pagination.",
          "tags": ["📋 Challan Management"],
          "security": [{"bearerAuth": []}],
          "parameters": [
            {
              "name": "page",
              "in": "query",
              "schema": {"type": "integer", "default": 1}
            },
            {
              "name": "limit", 
              "in": "query",
              "schema": {"type": "integer", "default": 10}
            }
          ],
          "responses": {
            "200": {
              "description": "Challans retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "data": {
                        "type": "object",
                        "properties": {
                          "challans": {
                            "type": "array",
                            "items": {"$ref": "#/components/schemas/Challan"}
                          },
                          "pagination": {"$ref": "#/components/schemas/Pagination"}
                        }
                      },
                      "message": {"type": "string", "example": "Challans retrieved successfully"}
                    }
                  }
                }
              }
            },
            "401": {"$ref": "#/components/responses/Unauthorized"},
            "403": {"$ref": "#/components/responses/Forbidden"}
          }
        }
      },
      "/api/passenger/mychallans": {
        "get": {
          "summary": "Get my challans (Passenger)",
          "description": "Retrieve challans for the logged-in passenger.",
          "tags": ["👥 Passenger Portal"],
          "security": [{"bearerAuth": []}],
          "responses": {
            "200": {
              "description": "Passenger challans retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {"type": "boolean", "example": true},
                      "data": {
                        "type": "object",
                        "properties": {
                          "challans": {
                            "type": "array",
                            "items": {"$ref": "#/components/schemas/Challan"}
                          },
                          "stats": {
                            "type": "object",
                            "properties": {
                              "total": {"type": "integer", "example": 5},
                              "paid": {"type": "integer", "example": 3},
                              "unpaid": {"type": "integer", "example": 2},
                              "totalAmount": {"type": "number", "example": 2500}
                            }
                          }
                        }
                      },
                      "message": {"type": "string", "example": "Challans retrieved successfully"}
                    }
                  }
                }
              }
            },
            "401": {"$ref": "#/components/responses/Unauthorized"}
          }
        }
      }
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "Enter JWT token in format: Bearer <token>"
        }
      },
      "responses": {
        "BadRequest": {
          "description": "Bad request - Invalid input data",
          "content": {
            "application/json": {
              "schema": {"$ref": "#/components/schemas/Error"}
            }
          }
        },
        "Unauthorized": {
          "description": "Unauthorized - Authentication required",
          "content": {
            "application/json": {
              "schema": {"$ref": "#/components/schemas/Error"}
            }
          }
        },
        "Forbidden": {
          "description": "Forbidden - Insufficient permissions",
          "content": {
            "application/json": {
              "schema": {"$ref": "#/components/schemas/Error"}
            }
          }
        },
        "NotFound": {
          "description": "Resource not found",
          "content": {
            "application/json": {
              "schema": {"$ref": "#/components/schemas/Error"}
            }
          }
        }
      },
      "schemas": {
        "Error": {
          "type": "object",
          "required": ["success", "error"],
          "properties": {
            "success": {"type": "boolean", "example": false},
            "error": {
              "type": "object",
              "properties": {
                "code": {"type": "string", "example": "VALIDATION_ERROR"},
                "message": {"type": "string", "example": "Invalid input data"},
                "details": {"type": "object", "additionalProperties": true},
                "timestamp": {"type": "string", "format": "date-time"}
              }
            }
          }
        },
        "ChallanResponse": {
          "type": "object",
          "properties": {
            "success": {"type": "boolean", "example": true},
            "data": {
              "type": "object", 
              "properties": {
                "challan": {"$ref": "#/components/schemas/Challan"}
              }
            },
            "message": {"type": "string", "example": "Challan issued successfully"}
          }
        },
        "Challan": {
          "type": "object",
          "required": ["_id", "trainNumber", "passengerName", "reason", "fineAmount", "location"],
          "properties": {
            "_id": {"type": "string", "example": "507f1f77bcf86cd799439012"},
            "trainNumber": {"type": "string", "example": "12345"},
            "coachNumber": {"type": "string", "example": "S2"},
            "passengerName": {"type": "string", "example": "Ravi Sharma"},
            "passengerAadharLast4": {"type": "string", "example": "1234"},
            "mobileNumber": {"type": "string", "example": "+919812345678"},
            "reason": {
              "type": "string",
              "enum": [
                "Travelling without proper pass/ticket",
                "Travelling Fraudulently",
                "Alarm Chain Pulling",
                "Coach Reserved for Handicapped",
                "Travelling on Roof Top",
                "Trespassing", 
                "Nuisance and Littering"
              ],
              "example": "Travelling without proper pass/ticket"
            },
            "fineAmount": {"type": "number", "minimum": 0, "example": 500},
            "location": {"type": "string", "example": "New Delhi Railway Station"},
            "latitude": {"type": "number", "format": "double", "example": 28.6139},
            "longitude": {"type": "number", "format": "double", "example": 77.2090},
            "paymentMode": {"type": "string", "enum": ["online", "offline"], "example": "online"},
            "paid": {"type": "boolean", "default": false, "example": false},
            "proofFiles": {
              "type": "array",
              "items": {"type": "string"},
              "example": ["/uploads/proof1.jpg", "/uploads/proof2.jpg"]
            },
            "issuedBy": {"type": "string", "example": "507f1f77bcf86cd799439011"},
            "issuedAt": {"type": "string", "format": "date-time", "example": "2025-09-24T10:30:00Z"},
            "createdAt": {"type": "string", "format": "date-time"},
            "updatedAt": {"type": "string", "format": "date-time"}
          }
        },
        "Pagination": {
          "type": "object",
          "properties": {
            "currentPage": {"type": "integer", "example": 1},
            "totalPages": {"type": "integer", "example": 10},
            "totalItems": {"type": "integer", "example": 95},
            "itemsPerPage": {"type": "integer", "example": 10},
            "hasNextPage": {"type": "boolean", "example": true},
            "hasPrevPage": {"type": "boolean", "example": false}
          }
        }
      }
    }
  };

  // Initialize Swagger UI with embedded spec
  window.ui = SwaggerUIBundle({
    spec: spec,
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
    displayRequestDuration: true,
    filter: true,
    supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
    onComplete: function() {
      console.log('🚂 Railway Challan API Documentation Loaded Successfully!');
      
      // Add custom styling
      const style = document.createElement('style');
      style.textContent = `
        .swagger-ui .topbar { background-color: #1f4e79; }
        .swagger-ui .info .title { color: #1f4e79; font-size: 36px; }
        .swagger-ui .scheme-container { background: #f7f7f7; padding: 15px 0; }
        .swagger-ui .info .description { font-size: 16px; line-height: 1.6; }
      `;
      document.head.appendChild(style);
    },
    onFailure: function(error) {
      console.error('Failed to load Swagger UI:', error);
    }
  });
};
