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
