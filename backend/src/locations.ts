export const locations = {
  observatories: [
    {
      name: "Hangon_Lintuasema",
      locations: ["Bunkkeri", "Piha", "Eteläkärki", "Metsä", "Luoto Gåu"],
      observationTypes: ["Vakio", "Muu muutto", "Yömuutto"],
      actions: [
        {
          type: "Tickbox",
          actions: ["standardObs", "gåu", "standardRing", "owlStandard", "mammals"],
        },
        {
          type: "Numeric",
          actions: ["attachments"],
        },
      ],
    },
    {
      name: "Jurmon_Lintuasema",
      locations: ["Korkein kohta", "Länsireitti"],
      observationTypes: [
        "Paikallinen",
        "Hajahavainto",
        "Vakio",
        "Esimerkki1",
        "Esimerkki2",
        "Esimerkki3",
      ],
      actions: [
        {
          type: "Tickbox",
          actions: ["testi"],
        },
      ],
    },
  ],
};

interface Day<Observatory extends "Hangon_Lintuasema" | "Jurmon_Lintuasema"> {
  observatory: Observatory;
  date: Date;
  comment: string;
  observers: string[];
  catches: Array<{
    type: string;
    openedAt: number;
    closedAt: number;
    amount: number;
    location: string;
    netLength: number;
    netCode: string;
  }>;
  periods: [
    {
      type: Observatory extends "Hangon_Lintuasema"
        ? "Vakio" | "Muu muutto" | "Yömuutto"
        : Observatory extends "Jurmon_Lintuasema"
        ? "Paikallinen" | "Hajahavainto" | "Vakio"
        : never;
      location: Observatory extends "Hangon_Lintuasema"
        ? Array<"Bunkkeri" | "Piha" | "Eteläkärki" | "Metsä" | "Luoto Gåu">
        : Observatory extends "Jurmon_Lintuasema"
        ? Array<"Korkein kohta" | "Länsireitti">
        : never;
      startTime: number;
      endTime: number;
      observations: Array<{
        species: string;
        adultUnknownCount: number;
        adultFemaleCount: number;
        adultMaleCount: number;
        juvenileUnknownCount: number;
        juvenileFemaleCount: number;
        juvenileMaleCount: number;
        subAdultUnknownCount: number;
        subAdultFemaleCount: number;
        subAdultMaleCount: number;
        unknownUnknownCount: number;
        unknownFemaleCount: number;
        unknownMaleCount: number;
        totalCount: number;
        direction: string;
        bypassSide: number;
        notes: string;
      }>;
    }
  ];
}
