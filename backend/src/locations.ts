export const locations = {
  observatories: [
    {
      observatory: "Hangon_Lintuasema",
      locations: ["Bunkkeri", "Piha", "Eteläkärki", "Metsä", "Luoto Gåu"],
      types: ["Vakio", "Muu muutto", "Yömuutto"],
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
      observatory: "Jurmon_Lintuasema",
      locations: ["Korkein kohta", "Länsireitti"],
      types: ["Paikallinen", "Hajahavainto", "Vakio", "Esimerkki1", "Esimerkki2", "Esimerkki3"],
      actions: [
        {
          type: "Tickbox",
          actions: ["testi"],
        },
      ],
    },
  ],
};
