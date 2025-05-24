export const HOSPITALS = [
  {
    id: 1,
    name: "Hospital Aroldo Tourinho",
    type: "hospital",
    description: "Hospital filantrópico com atendimento em diversas especialidades médicas.",
    address: "Av. Dep. Esteves Rodrigues, 1080 - Centro, Montes Claros - MG",
    phone: "(38) 3222-8200",
    hours: "24 horas",
    coordinates: [-16.7178, -43.8624],
    services: ["Emergência", "Consultas", "Cirurgias", "Exames", "Internação"],
    specialties: ["Cardiologia", "Ortopedia", "Neurologia", "Pediatria"]
  },
  {
    id: 2,
    name: "Hospital Universitário Clemente de Faria (HUCF)",
    type: "hospital",
    description: "Hospital universitário vinculado à UNIMONTES com atendimento em diversas especialidades.",
    address: "Av. Cula Mangabeira, 562 - Santo Reis, Montes Claros - MG",
    phone: "(38) 3224-8000",
    hours: "24 horas",
    coordinates: [-16.7285, -43.8658],
    services: ["Emergência", "Consultas", "Cirurgias", "Exames", "Internação"],
    specialties: ["Clínica Geral", "Ginecologia", "Obstetrícia", "Pediatria"]
  },
  {
    id: 3,
    name: "Santa Casa de Montes Claros",
    type: "hospital",
    description: "Hospital filantrópico referência em alta complexidade.",
    address: "Praça Honorato Alves, 22 - Centro, Montes Claros - MG",
    phone: "(38) 3229-2500",
    hours: "24 horas",
    coordinates: [-16.7201, -43.8641],
    services: ["Emergência", "Cirurgias", "UTI", "Oncologia"],
    specialties: ["Oncologia", "Cardiologia", "Neurologia"]
  },
  {
    id: 4,
    name: "UPA 24h Norte",
    type: "emergency",
    description: "Unidade de Pronto Atendimento da região norte.",
    address: "Av. José Corrêa Machado, s/n - Ibituruna, Montes Claros - MG",
    phone: "(38) 3214-7500",
    hours: "24 horas",
    coordinates: [-16.7065, -43.8712],
    services: ["Emergência", "Pronto Socorro", "Atendimento Básico"],
    specialties: ["Clínica Geral", "Pediatria"]
  },
  {
    id: 5,
    name: "UPA 24h Sul",
    type: "emergency",
    description: "Unidade de Pronto Atendimento da região sul.",
    address: "R. Carlos Leite, 396 - Morrinhos, Montes Claros - MG",
    phone: "(38) 3224-8400",
    hours: "24 horas",
    coordinates: [-16.7402, -43.8736],
    services: ["Emergência", "Pronto Socorro", "Atendimento Básico"],
    specialties: ["Clínica Geral", "Pediatria"]
  }
];

export const EMERGENCY_NUMBERS = {
  SAMU: "192",
  BOMBEIROS: "193",
  POLICIA: "190"
};

export const HEALTH_CENTERS = [
  {
    id: 6,
    name: "Centro de Saúde Major Prates",
    type: "health-center",
    description: "Unidade básica de saúde do bairro Major Prates.",
    address: "R. Major Prates, 450 - Major Prates, Montes Claros - MG",
    phone: "(38) 3221-4500",
    hours: "7h às 17h",
    coordinates: [-16.7205, -43.8647],
    services: ["Consultas Básicas", "Vacinação", "Pré-natal"],
    specialties: ["Clínica Geral", "Enfermagem"]
  },
  {
    id: 7,
    name: "Centro de Saúde São Judas",
    type: "health-center",
    description: "Unidade básica de saúde do bairro São Judas.",
    address: "R. São Judas Tadeu, 100 - São Judas, Montes Claros - MG",
    phone: "(38) 3229-3500",
    hours: "7h às 17h",
    coordinates: [-16.7189, -43.8601],
    services: ["Consultas Básicas", "Vacinação", "Farmácia"],
    specialties: ["Clínica Geral", "Enfermagem"]
  }
];