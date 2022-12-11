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
            schema: { type: "string" };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
            schema: { $ref: "#/components/schemas/Error" };
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
            schema: {
              type: "array";
              items: { $ref: "#/components/schemas/Observatory" };
            };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
            schema: { $ref: "#/components/schemas/Error" };
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
        parameters: [];
        responses: {
          "200": {
            description: "Success";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Observatory" };
              };
            };
            schema: { $ref: "#/components/schemas/Observatory" };
          };
          default: {
            description: "Error";
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" };
              };
            };
            schema: { $ref: "#/components/schemas/Error" };
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
        required: ["name", "cause", "message"];
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
      Locations: { type: "array"; items: { type: "string" } };
      ObservationTypes: { type: "array"; items: { type: "string" } };
      Observatory: {
        type: "object";
        properties: {
          name: { type: "string" };
          metadata: { $ref: "#/components/schemas/Metadata" };
          actions: {
            type: "array";
            items: {
              type: "object";
              properties: {
                actions: { type: "array"; items: { type: "string" } };
                type: { type: "string"; enum: ["TickBox", "Numeric"] };
              };
            };
          };
          locations: { $ref: "#/components/schemas/Locations" };
          observationTypes: { $ref: "#/components/schemas/ObservationTypes" };
        };
        required: [
          "name",
          "metadata",
          "actions",
          "locations",
          "observationTypes"
        ];
      };
      ObservatoryDay: {
        type: "object";
        properties: {
          observatory: { type: "string" };
          date: { type: "string"; format: "date" };
          comment: { type: "string" };
          observers: { type: "array"; items: { type: "string" } };
          catches: {
            type: "array";
            items: {
              type: "object";
              properties: {
                type: { type: "string" };
                openedAt: { type: "integer" };
                closedAt: { type: "integer" };
                amount: { type: "integer" };
                location: { type: "string" };
                netLength: { type: "integer" };
                netCode: { type: "string" };
              };
            };
          };
          periods: {
            type: "array";
            items: {
              type: "object";
              properties: {
                type: { type: "string" };
                location: { type: "string" };
                startTime: { type: "integer" };
                endTime: { type: "integer" };
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
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
