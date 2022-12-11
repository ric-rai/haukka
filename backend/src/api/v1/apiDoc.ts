export type ApiDoc = {
  openapi: "3.1.0";
  servers: [{ url: "http://localhost:3000/api/v1"; description: "local" }];
  info: { title: "Haukka"; version: "1.0.0" };
  paths: {
    "/login": {
      get: {
        summary: "Handles user login.";
        operationId: "getAccount";
        parameters: [
          {
            in: "query";
            name: "token";
            required: false;
            schema: { type: "string" };
          }
        ];
        responses: {
          "304": {
            description: "Redirect to the laji authentication if token was not provided. Redirect to the root if token was provided. \n";
            content: { "text/plain": { schema: { type: "string" } } };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
          };
        };
      };
    };
    "/observatory": {
      get: {
        summary: "All observatories";
        operationId: "getObservatories";
        responses: {
          "200": {
            description: "Success";
            content: {
              "application/json": {
                schema: {
                  type: "array";
                  items: { $ref: "#/components/schemas/Observatory" };
                };
              };
            };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
          };
        };
      };
    };
    "/observatory/{name}": {
      parameters: [
        { in: "path"; name: "name"; required: true; schema: { type: "string" } }
      ];
      get: {
        summary: "Get observatory by name.";
        operationId: "getObservatoryByName";
        responses: {
          "200": {
            description: "Success";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Observatory" };
              };
            };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
          };
        };
      };
    };
    "/observatory/{name}/day": {
      post: {
        summary: "Add new observatory day.";
        operationId: "newObservatoryDay";
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ObservatoryDay" };
            };
          };
        };
        responses: {
          "200": {
            description: "Success";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ObservatoryDay" };
              };
            };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
          };
        };
      };
    };
  };
  components: {
    schemas: {
      Error: {
        type: "object";
        properties: {
          name: { type: "string" };
          message: { type: "string" };
          cause: { type: "string" };
          stack: { type: "string" };
          code: { type: "integer" };
          validationErrors: {
            type: "array";
            items: {
              properties: {
                path: { type: "string" };
                errorCode: { type: "string" };
                message: { type: "string" };
              };
              required: ["path", "errorCode", "message"];
            };
          };
          invalidResponse: { type: "object" };
        };
        required: ["cause"];
      };
      Metadata: {
        type: "object";
        properties: {
          created: { type: "string"; format: "date-time" };
          modified: { type: "string"; format: "date-time" };
          isDeleted: { type: "integer"; enum: [0, 1] };
        };
        required: ["created", "modified", "isDeleted"];
      };
      Location_HangonLintuasema: {
        type: "string";
        enum: ["Bunkkeri", "Piha", "Eteläkärki", "Metsä", "Luoto Gåu"];
      };
      ObservationType_HangonLintuasema: {
        type: "string";
        enum: ["Vakio", "Muu muutto", "Yömuutto"];
      };
      HangonLintuasema: {
        type: "object";
        properties: {
          name: { type: "string"; enum: ["Hangon_Lintuasema"] };
          metadata: { $ref: "#/components/schemas/Metadata" };
          actions: {
            type: "object";
            properties: {
              tickBox: {
                type: "array";
                items: {
                  type: "string";
                  enum: [
                    "standardObs",
                    "gåu",
                    "standardRing",
                    "owlStandard",
                    "mammals"
                  ];
                };
              };
              numeric: {
                type: "array";
                items: { type: "string"; enum: ["attachments"] };
              };
            };
            required: ["tickBox", "numeric"];
          };
          locations: {
            type: "array";
            items: { $ref: "#/components/schemas/Location_HangonLintuasema" };
          };
          observationTypes: {
            type: "array";
            items: {
              $ref: "#/components/schemas/ObservationType_HangonLintuasema";
            };
          };
        };
        required: [
          "name",
          "metadata",
          "actions",
          "locations",
          "observationTypes"
        ];
      };
      Location_JurmonLintuasema: {
        type: "string";
        enum: ["Korkein kohta", "Länsireitti"];
      };
      ObservationType_JurmonLintuasema: {
        type: "string";
        enum: [
          "Paikallinen",
          "Hajahavainto",
          "Vakio",
          "Esimerkki1",
          "Esimerkki2",
          "Esimerkki3"
        ];
      };
      JurmonLintuasema: {
        type: "object";
        properties: {
          name: { type: "string"; enum: ["Jurmon_Lintuasema"] };
          metadata: { $ref: "#/components/schemas/Metadata" };
          actions: {
            type: "object";
            properties: {
              tickBox: {
                type: "array";
                items: {
                  type: "string";
                  enum: [
                    "standardObs",
                    "gåu",
                    "standardRing",
                    "owlStandard",
                    "mammals"
                  ];
                };
              };
              numeric: {
                type: "array";
                items: { type: "string"; enum: ["attachments"] };
              };
            };
            required: ["tickBox", "numeric"];
          };
          locations: {
            type: "array";
            items: { $ref: "#/components/schemas/Location_JurmonLintuasema" };
          };
          observationTypes: {
            type: "array";
            items: {
              $ref: "#/components/schemas/ObservationType_JurmonLintuasema";
            };
          };
        };
        required: [
          "name",
          "metadata",
          "actions",
          "locations",
          "observationTypes"
        ];
      };
      Observatory: {
        oneOf: [
          { $ref: "#/components/schemas/HangonLintuasema" },
          { $ref: "#/components/schemas/JurmonLintuasema" }
        ];
      };
      ObservatoryDay: {
        oneOf: [
          {
            allOf: [
              {
                type: "object";
                properties: {
                  observatory: { type: "string"; enum: ["Hangon_Lintuasema"] };
                  periods: {
                    type: "array";
                    items: {
                      type: "object";
                      properties: {
                        type: {
                          $ref: "#/components/schemas/ObservationType_HangonLintuasema";
                        };
                        location: {
                          $ref: "#/components/schemas/Location_HangonLintuasema";
                        };
                      };
                      required: ["type", "location"];
                    };
                  };
                };
                required: ["observatory", "periods"];
              },
              { $ref: "#/components/schemas/ObservatoryDayBase" }
            ];
          },
          {
            allOf: [
              {
                type: "object";
                properties: {
                  observatory: { type: "string"; enum: ["Jurmon_Lintuasema"] };
                  periods: {
                    type: "array";
                    items: {
                      type: "object";
                      properties: {
                        type: {
                          $ref: "#/components/schemas/ObservationType_JurmonLintuasema";
                        };
                        location: {
                          $ref: "#/components/schemas/Location_JurmonLintuasema";
                        };
                      };
                      required: ["type", "location"];
                    };
                  };
                };
                required: ["observatory", "periods"];
              },
              { $ref: "#/components/schemas/ObservatoryDayBase" }
            ];
          }
        ];
      };
      ObservatoryDayBase: {
        type: "object";
        properties: {
          date: { type: "string"; format: "date" };
          comment: { type: "string" };
          observers: { type: "array"; items: { type: "string" } };
          catches: {
            type: "array";
            items: {
              type: "object";
              properties: {
                type: { type: "string" };
                openedAt: { type: "string"; format: "date-time" };
                closedAt: { type: "string"; format: "date-time" };
                amount: { type: "integer" };
                location: { type: "string" };
                netLength: { type: "integer" };
                netCode: { type: "string" };
              };
              required: [
                "type",
                "openedAt",
                "closedAt",
                "amount",
                "location",
                "netLength",
                "netCode"
              ];
            };
          };
          periods: {
            type: "array";
            items: {
              type: "object";
              properties: {
                startTime: { type: "string"; format: "date-time" };
                endTime: { type: "string"; format: "date-time" };
                observations: {
                  type: "array";
                  items: {
                    type: "object";
                    properties: {
                      species: { type: "string" };
                      adultUnknownCount: { type: "integer" };
                      adultFemaleCount: { type: "integer" };
                      adultMaleCount: { type: "integer" };
                      juvenileUnknownCount: { type: "integer" };
                      juvenileFemaleCount: { type: "integer" };
                      juvenileMaleCount: { type: "integer" };
                      subAdultUnknownCount: { type: "integer" };
                      subAdultFemaleCount: { type: "integer" };
                      subAdultMaleCount: { type: "integer" };
                      unknownUnknownCount: { type: "integer" };
                      unknownFemaleCount: { type: "integer" };
                      unknownMaleCount: { type: "integer" };
                      totalCount: { type: "integer" };
                      direction: { type: "string" };
                      bypassSide: { type: "integer" };
                      notes: { type: "string" };
                    };
                    required: [
                      "species",
                      "adultUnknownCount",
                      "adultFemaleCount",
                      "adultMaleCount",
                      "juvenileUnknownCount",
                      "juvenileFemaleCount",
                      "juvenileMaleCount",
                      "subAdultUnknownCount",
                      "subAdultFemaleCount",
                      "subAdultMaleCount",
                      "unknownUnknownCount",
                      "unknownFemaleCount",
                      "unknownMaleCount",
                      "totalCount",
                      "direction",
                      "bypassSide",
                      "notes"
                    ];
                  };
                };
              };
              required: ["startTime", "endTime", "observations"];
            };
          };
        };
        required: ["date", "comment", "observers", "catches", "periods"];
      };
    };
  };
};
