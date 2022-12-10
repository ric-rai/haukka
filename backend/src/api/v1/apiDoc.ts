export type ApiDoc = {
  "openapi": "3.1.0",
  "servers": [
    {
      "url": "http://localhost:3000/api/v1",
      "description": "local"
    }
  ],
  "info": {
    "title": "Haukka",
    "version": "1.0.0"
  },
  "paths": {
    "/login": {
      "get": {
        "summary": "Handles login after the user has been authenticated.",
        "operationId": "getAccount",
        "parameters": [
          {
            "in": "query",
            "name": "token",
            "required": false,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "304": {
            "description": "Redirect to the root.",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/observatory": {
      "get": {
        "summary": "All observatories",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Observatory"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/observatory/{name}": {
      "parameters": [
        {
          "in": "path",
          "name": "name",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "get": {
        "summary": "Get observatory by name.",
        "parameters": [],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Observatory"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Metadata": {
        "type": "object",
        "properties": {
          "created": {
            "type": "integer"
          },
          "modified": {
            "type": "integer"
          },
          "isDeleted": {
            "type": "boolean"
          }
        }
      },
      "Locations": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "ObservationTypes": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "Observatory": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "metadata": {
            "$ref": "#/components/schemas/Metadata"
          },
          "actions": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "actions": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                "type": {
                  "type": "string",
                  "enum": [
                    "TickBox",
                    "Numeric"
                  ]
                }
              }
            }
          },
          "locations": {
            "$ref": "#/components/schemas/Locations"
          },
          "observationTypes": {
            "$ref": "#/components/schemas/ObservationTypes"
          }
        }
      },
      "ObservatoryDay": {
        "type": "object",
        "properties": {
          "observatory": {
            "type": "string"
          },
          "date": {
            "type": "string",
            "format": "date"
          },
          "comment": {
            "type": "string"
          },
          "observers": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "catches": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string"
                },
                "openedAt": {
                  "type": "integer"
                },
                "closedAt": {
                  "type": "integer"
                },
                "amount": {
                  "type": "integer"
                },
                "location": {
                  "type": "string"
                },
                "netLength": {
                  "type": "integer"
                },
                "netCode": {
                  "type": "string"
                }
              }
            }
          },
          "periods": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "type": {
                  "type": "string"
                },
                "location": {
                  "type": "string"
                },
                "startTime": {
                  "type": "integer"
                },
                "endTime": {
                  "type": "integer"
                },
                "observations": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "species": {
                        "type": "string"
                      },
                      "adultUnknownCount": {
                        "type": "integer"
                      },
                      "adultFemaleCount": {
                        "type": "integer"
                      },
                      "adultMaleCount": {
                        "type": "integer"
                      },
                      "juvenileUnknownCount": {
                        "type": "integer"
                      },
                      "juvenileFemaleCount": {
                        "type": "integer"
                      },
                      "juvenileMaleCount": {
                        "type": "integer"
                      },
                      "subAdultUnknownCount": {
                        "type": "integer"
                      },
                      "subAdultFemaleCount": {
                        "type": "integer"
                      },
                      "subAdultMaleCount": {
                        "type": "integer"
                      },
                      "unknownUnknownCount": {
                        "type": "integer"
                      },
                      "unknownFemaleCount": {
                        "type": "integer"
                      },
                      "unknownMaleCount": {
                        "type": "integer"
                      },
                      "totalCount": {
                        "type": "integer"
                      },
                      "direction": {
                        "type": "string"
                      },
                      "bypassSide": {
                        "type": "integer"
                      },
                      "notes": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
