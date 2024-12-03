import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
};
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface GroupedEvents {
  [date: string]: Event[];
}
export interface GroupedMeals {
  [date: string]: Meal[];
}
export interface CalendarViewProps {
  events: GroupedEvents;
  meals: GroupedMeals;
}
export interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  id?: string;
}
export type MediaType = "video" | "image";

export type MediaItem = {
  type: MediaType;
  key: string;
  caption: string;
};

export type MediaWithUrl = {
  type: MediaType;
  url: string;
  caption: string;
};

export const mediaItems: MediaItem[] = [
  {
    type: "video",
    key: "landing-page/full_day_care.MP4",
    caption: "A Day in Life at Vista Adult Day Care",
  },
  {
    type: "video",
    key: "landing-page/Gym.MP4",
    caption: "Our Modern Facilities",
  },
  {
    type: "image",
    key: "landing-page/happy_faces.jpg",
    caption: "Happy Faces",
  },
  {
    type: "image",
    key: "landing-page/team.jpg",
    caption: "Our Team",
  },
];

//Eligibility Data
export const imageGalleryItems: MediaItem[] = [
  {
    type: "image",
    key: "insurance-page/Anthem.jpg",
    caption: "Anthem",
  },
  {
    type: "image",
    key: "insurance-page/California.png",
    caption: "California",
  },
  {
    type: "image",
    key: "insurance-page/Medi-cal.png",
    caption: "Medi-cal",
  },
  {
    type: "image",
    key: "insurance-page/Medicare.png",
    caption: "Medicare",
  },
];

//Services Slider Data
export const slider: MediaItem[] = [
  {
    type: "image",
    key: "services-page/slider1.jpg",
    caption: "Slider",
  },
  {
    type: "image",
    key: "services-page/slider2.jpg",
    caption: "Slider",
  },
  {
    type: "image",
    key: "services-page/slider3.jpg",
    caption: "Slider",
  },
  {
    type: "image",
    key: "services-page/slider4.jpg",
    caption: "Slider",
  },
  {
    type: "image",
    key: "services-page/slider5.jpg",
    caption: "Slider",
  },
];

// Events Gallery
export type Events = {
  title: string;
  imageKey: string;
};

export type EventsWithUrl = Events & {
  imageUrl: string;
};
export const eventsData: Events[] = [
  {
    title: "No Events",
    imageKey: "events-page/NoEvents.jpg",
  },
  {
    title: "No Meal Plan",
    imageKey: "events-page/NoMeal.jpg",
  },
];

// New Testimonial types
export type Testimonial = {
  name: string;
  text: string;
  rating: number;
  role: string;
  imageKey: string;
  text_es: string;
  role_es: string;
};

export type TestimonialWithUrl = Testimonial & {
  imageUrl: string;
};
export const testimonialData: Testimonial[] = [
  {
    name: "Francisco(Paco) R.",
    text: "I love everything here. I also have a best friend here at the center. The fondest memory of this place for me is when I won at Raffle game.",
    rating: 5,
    role: "Long-term Member",
    imageKey: "landing-page/Paco.jpg",
    text_es:
      "Me encanta todo aquí. También tengo un mejor amigo aquí en el centro. El recuerdo más querido de este lugar para mí es cuando gané en el juego de Rifa.",
    role_es: "Miembro a largo plazo",
  },
  {
    name: "Yolanda Perez",
    text: "I've been coming here for 10 years now and have made so many friends. I keep coming back here because I feel regenerated and I feel good and like I did something. It just does good for me when I go back home!",
    rating: 5,
    role: "Long-term Member",
    imageKey: "landing-page/yolanda.jpg",
    text_es:
      "He estado viniendo aquí durante 10 años y he hecho tantos amigos. Sigo regresando aquí porque me siento regenerada, me siento bien y siento que hice algo. ¡Me hace bien cuando regreso a casa!",
    role_es: "Miembro a largo plazo",
  },
  {
    name: "Raul Moreno",
    text: "This center has impacted me in a great way due to my accident in the past. They focused on taking care of me, making sure I was mentally, physically, and emotionally good. I have been here for 19 years and their care for me is unwavering.",
    rating: 5,
    role: "Long-term Member",
    imageKey: "landing-page/raul.jpg",
    text_es:
      "Este centro me ha impactado de gran manera debido a mi accidente en el pasado. Se enfocaron en cuidarme, asegurándose de que estuviera bien mental, física y emocionalmente. He estado aquí durante 19 años y su cuidado por mí es inquebrantable.",
    role_es: "Miembro a largo plazo",
  },
];

//Services Provided
export type Services = {
  title: string;
  title_es: string;
  imageKey: string;
  description: string;
  description_es: string;
  extraImages?: string[];
  details?: string;
  details_es?: string;
};

export type ServiceUrl = Services & {
  imageUrl: string;
};

export const serviceData: Services[] = [
  {
    title: "Health Services",
    title_es: "Servicios de Salud",
    imageKey: "services-page/artistiqueimagery-097.jpg",
    description:
      "Comprehensive services for your health.",
    description_es:
      "Servicios integrales para tu salud.",
    extraImages: [
      "services-page/hs1.jpg",
      "services-page/hs2.jpg",
      "services-page/hs3.jpg",
      "services-page/hs4.jpg",
      "services-page/hs5.jpg",
      "services-page/hs6.jpg",
    ],
    details:
      "Vista ADHC offers a broad range of healthcare services that promote faster healing, recovery, and rehabilitation. We aim to help our participants fully live their lives by rendering high-quality services that will enhance their health and overall well-being as well as their independence and self-reliance. Our professional healthcare staff monitor and supervise our participants to ensure that they are in their best health possible and to be able to address their varying and/or immediate care needs.",
    details_es:
      "Vista ADHC ofrece una amplia gama de servicios de atención médica que promueven una recuperación, sanación y rehabilitación más rápida. Nuestro objetivo es ayudar a nuestros participantes a vivir plenamente sus vidas brindando servicios de alta calidad que mejoren su salud, bienestar general, independencia y autosuficiencia. Nuestro personal profesional de atención médica monitorea y supervisa a los participantes para garantizar que estén en las mejores condiciones de salud posibles y para poder atender sus necesidades de cuidado inmediatas y/o variadas.",
  },
  {
    title: "Professional Nursing Services",
    title_es: "Servicios Profesionales de Enfermería",
    imageKey: "services-page/artistiqueimagery-133.jpg",
    description:
      "Skilled nursing care services to maximize overall health potential.",
    description_es:
      "Servicios de cuidados de enfermería especializada para maximizar el potencial general de salud.",
    extraImages: [
      "services-page/pn1.jpg",
      "services-page/pn2.jpg",
      "services-page/pn3.jpg",
    ],
    details:
      "Vista Adult Day Health Care center has registered nurses and licensed practical nurses who are seasoned and skilled in providing basic to advanced health care services. Our RNs and LPNs provide regular monitoring and supervision to each participant to optimize their health and keep them safe and secure in our center. Other than that, our nurses also provide the following: Assistance with Medications, Personal Care (e.g. Assistance with Toileting and Grooming), Monthly Health Education Group Sessions, Liaison with Personal Physician, Caregivers, and Family Members, And More.",
    details_es:
      "El centro Vista Adult Day Health Care cuenta con enfermeras registradas y enfermeras prácticas con licencia, quienes tienen experiencia y habilidades en la prestación de servicios de atención médica básicos y avanzados. Nuestras enfermeras registradas (RNs) y enfermeras prácticas con licencia (LPNs) brindan monitoreo y supervisión regular a cada participante para optimizar su salud y garantizar su seguridad en nuestro centro. Además, nuestras enfermeras también ofrecen los siguientes servicios: Asistencia con medicamentos, Cuidado personal (por ejemplo, ayuda con el uso del baño y el aseo personal), Sesiones grupales mensuales de educación en salud, Enlace con el médico personal, cuidadores y familiares, Y más.",
  },
  {
    title: "Activities",
    title_es: "Actividades",
    imageKey: "services-page/artistiqueimagery-080.jpg",
    description:
      "Social activities to maximize socio-emotional well-being.",
    description_es:
      "Actividades sociales para maximizar el bienestar socioemocional.",
    extraImages: [
      "services-page/a1.jpg",
      "services-page/a2.jpg",
      "services-page/a3.jpg",
      "services-page/a4.jpg",
      "services-page/a5.jpg",
      "services-page/a6.jpg",
    ],
    details:
      "Vista Adult Day Health Care Center has a team of Social Workers, Psychologists, a Program Director and Healthcare Professionals who put together fun activities for the seniors daily at the center.  Participants look forward to many of the activities from Bingo, dance parties to holiday celebrations.  Please check out our Activities Calendar for more information.",
    details_es:
      "El centro Vista Adult Day Health Care cuenta con un equipo de trabajadores sociales, psicólogos, un director de programa y profesionales de la salud que organizan actividades divertidas diariamente para los adultos mayores en el centro. Los participantes disfrutan de muchas actividades, desde bingo y fiestas de baile hasta celebraciones de días festivos. Por favor, consulte nuestro Calendario de Actividades para más información.",
  },
  {
    title: "Transportation",
    title_es: "Transporte",
    imageKey: "services-page/artistiqueimagery-117.jpg",
    description:
      "We’ll keep you safe while traveling from your home to the center and back.",
    description_es:
      "Te mantendremos seguro mientras viajas desde tu hogar al centro y de regreso.",
    extraImages: [
      "services-page/t1.jpg",
      "services-page/t2.jpg",
      "services-page/t3.jpg",
    ],
    details:
      "Safe, reliable, door-to-door transportation is provided to help you get to the center and back home safely. We have experienced drivers who have great work ethic and love what they do.  They take great care of our participants and keep them safe throughout the whole journey.",
    details_es:
      "Se proporciona transporte seguro, confiable y puerta a puerta para ayudarte a llegar al centro y regresar a casa de manera segura. Contamos con conductores experimentados que tienen una excelente ética de trabajo y aman lo que hacen. Cuidan con esmero a nuestros participantes y los mantienen seguros durante todo el trayecto.",
  },
  {
    title: "Nutritional Counseling",
    title_es: "Asesoramiento Nutricional",
    imageKey: "services-page/artistiqueimagery-119.jpg",
    description:
      "We serve nutritious and delicious meals to our participants.",
    description_es:
      "Servimos comidas nutritivas y deliciosas a nuestros participantes.",
    extraImages: [
      "services-page/nc1.jpg",
      "services-page/nc2.jpg",
      "services-page/nc3.jpg",
    ],
    details:
      "We have a licensed dietitian who monitors the nutrition intake of every participant in our center. We make sure that every food served matches their dietary needs. Our services include: Dietary Consultation, Nutritional Education and Nutritionally Balanced Hot Meals Served Daily. Meals Provided are: Breakfast, Lunch and Snacks.",
    details_es:
     "Contamos con un dietista licenciado que supervisa la ingesta nutricional de cada participante en nuestro centro. Nos aseguramos de que cada alimento servido cumpla con sus necesidades dietéticas. Nuestros servicios incluyen: consulta dietética, educación nutricional y comidas calientes equilibradas servidas diariamente. Las comidas proporcionadas son: desayuno, almuerzo y refrigerios.",
  },
  {
    title: "Individual Assessment",
    title_es: "Evaluación Individual",
    imageKey: "services-page/artistiqueimagery-101.jpg",
    description:
      "We conduct assessments and evaluations to address their needs immediately as needed.",
    description_es:
      "Llevamos a cabo evaluaciones y valoraciones para atender sus necesidades de inmediato, según sea necesario.",
    extraImages: [
      "services-page/ia1.jpg",
      "services-page/ia2.jpg",
      "services-page/ia3.jpg",
      "services-page/ia4.jpg",
      "services-page/ia5.jpg",
      "services-page/ia6.jpg",
    ],
    details:
      "Our nurses provide: Individual Assessments, Blood Glucose Monitoring and High Blood Pressure Monitoring. Our social workers provide: Psychosocial Assessments, Individual Counseling, Family Counseling, Liaison with Community Agencies and Support Groups Daily. Our Physical and Occupational Therapists provide: Individual Assessments, Group exercises, Assistance with obtaining therapy equipment, Therapeutic physical therapy exercises, such as gait and balance training and range of motion exercises, to help them perform daily living tasks on their own and regain their strength and independence and Occupational Therapy exercises - to help our participants towards regaining or learning a new set of skills that they can use to improve their mobility and allow them to do the things they want and need.",
    details_es:
    "Nuestras enfermeras proporcionan: evaluaciones individuales, monitoreo de glucosa en sangre y monitoreo de presión arterial alta. Nuestros trabajadores sociales ofrecen: evaluaciones psicosociales, consejería individual, consejería familiar, enlace con agencias comunitarias y grupos de apoyo diariamente. Nuestros terapeutas físicos y ocupacionales brindan: evaluaciones individuales, ejercicios grupales, asistencia para obtener equipos de terapia, ejercicios terapéuticos de fisioterapia, como entrenamiento de marcha y equilibrio y ejercicios de rango de movimiento, para ayudarles a realizar tareas diarias por sí mismos y recuperar su fuerza e independencia, y ejercicios de terapia ocupacional, para ayudar a nuestros participantes a recuperar o aprender un nuevo conjunto de habilidades que pueden usar para mejorar su movilidad y permitirles hacer las cosas que desean y necesitan."
  },
];

//Gallery Provided
export type Gallery = {
  title: string;
  imageKey: string;
};

export type GalleryEnvUrl = Gallery & {
  imageUrl: string;
};

export const GalleryData_Env: Gallery[] = [
  {
    title: "Main Entrance2",
    imageKey: "gallery-page/environment/env_main2.jpg",
  },
  {
    title: "Front door",
    imageKey: "gallery-page/environment/env_door.jpg",
  },
  {
    title: "Outside of front",
    imageKey: "gallery-page/environment/env_outside.jpg",
  },
  {
    title: "Main Entrance1",
    imageKey: "gallery-page/environment/env_main1.jpg",
  },
  {
    title: "Entrance",
    imageKey: "gallery-page/environment/env_entrance.jpg",
  },
  {
    title: "Gym",
    imageKey: "gallery-page/environment/env_gym.jpg",
  },
  {
    title: "Parking lot",
    imageKey: "gallery-page/environment/env_parking.jpg",
  },
  {
    title: "Wall decoration",
    imageKey: "gallery-page/environment/env_wall.jpg",
  },
];
export const GalleryData_Act: Gallery[] = [
  {
    title: "Activity 1",
    imageKey: "gallery-page/activities/act_act1.jpg",
  },
  {
    title: "Activity 2",
    imageKey: "gallery-page/activities/act_act2.jpg",
  },
  {
    title: "Activity 3",
    imageKey: "gallery-page/activities/act_act3.jpg",
  },
  {
    title: "Activity 4",
    imageKey: "gallery-page/activities/act_act4.jpg",
  },
  {
    title: "Activity 5",
    imageKey: "gallery-page/activities/act_act5.jpg",
  },
  {
    title: "Activity 6",
    imageKey: "gallery-page/activities/act_act6.jpg",
  },
  {
    title: "Bingo 1",
    imageKey: "gallery-page/activities/act_bingo1.jpg",
  },
  {
    title: "Bingo 2",
    imageKey: "gallery-page/activities/act_bingo2.jpg",
  },
  {
    title: "Bingo 3",
    imageKey: "gallery-page/activities/act_bingo3.jpg",
  },
  {
    title: "Bingo 4",
    imageKey: "gallery-page/activities/act_bingo4.jpg",
  },
  {
    title: "Bingo 5",
    imageKey: "gallery-page/activities/act_bingo5.jpg",
  },
  {
    title: "Bingo 6",
    imageKey: "gallery-page/activities/act_bingo6.jpg",
  },
  {
    title: "Bingo 7",
    imageKey: "gallery-page/activities/act_bingo7.jpg",
  },
  {
    title: "Bingo 8",
    imageKey: "gallery-page/activities/act_bingo8.jpg",
  },
  {
    title: "Gym 1",
    imageKey: "gallery-page/activities/act_gym1.jpg",
  },
  {
    title: "Gym 2",
    imageKey: "gallery-page/activities/act_gym2.jpg",
  },
  {
    title: "Gym 3",
    imageKey: "gallery-page/activities/act_gym3.jpg",
  },
  {
    title: "Gym 4",
    imageKey: "gallery-page/activities/act_gym4.jpg",
  },
  {
    title: "Gym 5",
    imageKey: "gallery-page/activities/act_gym5.jpg",
  },
  {
    title: "Gym 6",
    imageKey: "gallery-page/activities/act_gym6.jpg",
  },
];

//Aboutus Provided
export type Staffs = {
  title: string;
  imageKey: string;
  description: string;
  id: number;
};

export type StaffsUrl = Staffs & {
  imageUrl: string;
};

export const StaffsData_admin: Staffs[] = [
  {
    title: "Founder",
    imageKey: "aboutus-page/staff_founder.jpg",
    description: "founder background",
    id: 1,
  },
  {
    title: "Project Director",
    imageKey: "aboutus-page/staff_director.jpg",
    description: "director background",
    id: 2,
  },
  {
    title: "Office Assist. / Recep.",
    imageKey: "aboutus-page/staff_recep.jpg",
    description: "Office Assist. / Recep. background",
    id: 3,
  },
];

export const StaffsData_act: Staffs[] = [
  {
    title: "Activities Coordinator",
    imageKey: "aboutus-page/staff_actCoord.jpg",
    description: "Activities Coordinator background",
    id: 1,
  },
  {
    title: "Program Aide",
    imageKey: "aboutus-page/staff_PAide1.jpg",
    description: "Program Aide background",
    id: 2,
  },
  {
    title: "Program Aide",
    imageKey: "aboutus-page/staff_Paide2.jpg",
    description: "Program Aide background",
    id: 3,
  },
  {
    title: "Program Aide",
    imageKey: "aboutus-page/staff_PAide3.jpg",
    description: "Program Aide background",
    id: 4,
  },
  {
    title: "Social Worker",
    imageKey: "aboutus-page/staff_social.jpg",
    description: "Social Worker background",
    id: 2,
  },
  {
    title: "Program Aide / Driver",
    imageKey: "aboutus-page/staff_driver1.jpg",
    description: "Program Aide / Driver background",
    id: 2,
  },
  {
    title: "Program Aide / Driver",
    imageKey: "aboutus-page/staff_driver2.jpg",
    description: "Program Aide / Driver background",
    id: 3,
  },
];

export const StaffsData_health: Staffs[] = [
  {
    title: "PT/OT Aide",
    imageKey: "aboutus-page/staff_pt1.jpg",
    description: "PT/OT Aide background",
    id: 1,
  },
  {
    title: "PT/OT Aide",
    imageKey: "aboutus-page/staff_pt2.jpg",
    description: "PT/OT Aide background",
    id: 2,
  },
  {
    title: "CNA",
    imageKey: "aboutus-page/staff_cna.jpg",
    description: "CNA background",
    id: 3,
  },
  {
    title: "Program Aide / Kitchen",
    imageKey: "aboutus-page/staff_kitchen.jpg",
    description: "Program Aide / Kitchen background",
    id: 4,
  },
  {
    title: "RD",
    imageKey: "aboutus-page/staff_rd.jpg",
    description: "RD background",
    id: 2,
  },
];

export const StaffsData_whole: Staffs[] = [
  {
    title: "All Staffs",
    imageKey: "aboutus-page/staffs.jpg",
    description: "All Staffs",
    id: 1,
  },
];

export interface Event {
  id: number;
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  isHighlight: boolean;
}

export interface Meal {
  meal_date: string;
  meal_name: string;
  quantity: string;
}
export interface Contact {
  id: number;
  date: string;
  name: string;
  phone: string;
  email: string;
}
// Interface for the API response
export interface ContactsApiResponse {
  contacts: Contact[];
}
export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
