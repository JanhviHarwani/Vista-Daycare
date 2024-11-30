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
      "Support and counseling to address emotional and physical well-being and mental health challenges.",
    description_es:
      "Apoyo y asesoramiento para abordar el bienestar emocional y físico, así como los desafíos de la salud mental.",
    extraImages: [
      "services-page/hs1.jpg",
      "services-page/hs2.jpg",
      "services-page/hs3.jpg",
      "services-page/hs4.jpg",
      "services-page/hs5.jpg",
      "services-page/hs6.jpg",
    ],
    details:
      "Comprehensive support and therapeutic services aimed at enhancing physical health, promoting recovery, and addressing challenges related to mobility, pain management, and overall physical well-being. Our expert team provides personalized care through physiotherapy, rehabilitation, and wellness programs tailored to meet individual needs. These services focus on improving strength, flexibility, and function while helping clients regain independence and confidence in their daily activities",
    details_es:
      "Apoyo integral y servicios terapéuticos enfocados en mejorar la salud física, promover la recuperación y abordar los desafíos relacionados con la movilidad, el manejo del dolor y el bienestar físico general. Nuestro equipo de expertos ofrece atención personalizada a través de fisioterapia, rehabilitación y programas de bienestar adaptados a las necesidades individuales. Estos servicios se centran en mejorar la fuerza, la flexibilidad y la función, ayudando a los clientes a recuperar la independencia y la confianza en sus actividades diarias.",
  },
  {
    title: "Professional Nursing Services",
    title_es: "Servicios Profesionales de Enfermería",
    imageKey: "services-page/artistiqueimagery-133.jpg",
    description:
      "Skilled nursing care to monitor and manage medical conditions and treatments.",
    description_es:
      "Atención de enfermería especializada para supervisar y gestionar condiciones médicas y tratamientos.",
    extraImages: [
      "services-page/pn1.jpg",
      "services-page/pn2.jpg",
      "services-page/pn3.jpg",
    ],
    details:
      "Expert nursing care designed to closely monitor and manage a variety of medical conditions and treatments. Our skilled professionals provide compassionate support ensuring that patients receive personalized care tailored to their specific needs. This includes medication administration, wound care, health assessments, and ongoing coordination with healthcare providers to promote recovery and overall well-being.",
    details_es:
      "Atención de enfermería experta diseñada para monitorear y manejar de cerca una variedad de condiciones médicas y tratamientos. Nuestros profesionales capacitados brindan un apoyo compasivo, asegurando que los pacientes reciban atención personalizada adaptada a sus necesidades específicas. Esto incluye la administración de medicamentos, cuidado de heridas, evaluaciones de salud y una coordinación continua con los proveedores de atención médica para promover la recuperación y el bienestar general.",
  },
  {
    title: "Activities",
    title_es: "Actividades",
    imageKey: "services-page/artistiqueimagery-080.jpg",
    description:
      "Engaging programs designed to stimulate cognitive and physical health.",
    description_es:
      "Programas atractivos diseñados para estimular la salud cognitiva y física.",
    extraImages: [
      "services-page/a1.jpg",
      "services-page/a2.jpg",
      "services-page/a3.jpg",
      "services-page/a4.jpg",
      "services-page/a5.jpg",
      "services-page/a6.jpg",
    ],
    details:
      "We offer a variety of engaging programs designed to stimulate both cognitive and physical health, promoting overall well-being. Activities such as Bingo, DJ nights, and interactive games are tailored to encourage social interaction, mental sharpness, and physical activity in a fun and supportive environment. These programs not only provide entertainment but also help improve memory, coordination, and mood, enhancing the participants' quality of life.",
    details_es:
      "Ofrecemos una variedad de programas atractivos diseñados para estimular tanto la salud cognitiva como física, promoviendo el bienestar general. Actividades como Bingo, noches de DJ y juegos interactivos están adaptadas para fomentar la interacción social, la agudeza mental y la actividad física en un ambiente divertido y de apoyo. Estos programas no solo brindan entretenimiento, sino que también ayudan a mejorar la memoria, la coordinación y el estado de ánimo, mejorando la calidad de vida de los participantes.",
  },
  {
    title: "Transportation",
    title_es: "Transporte",
    imageKey: "services-page/artistiqueimagery-117.jpg",
    description:
      " We provide safe and convenient transportation to and from the facility for participants from surrounding areas.",
    description_es:
      "Proporcionamos transporte seguro y conveniente hacia y desde la instalación para los participantes de las áreas circundantes.",
    extraImages: [
      "services-page/t1.jpg",
      "services-page/t2.jpg",
      "services-page/t3.jpg",
    ],
    details:
      "We offer safe, reliable, and convenient transportation services to ensure participants can travel to and from our facility with ease. Our transportation is designed to accommodate individuals from surrounding areas, providing a stress-free experience and ensuring timely arrival for appointments, programs, or treatments. This service is tailored to enhance accessibility and promote seamless participation in all scheduled activities.",
    details_es:
      "Ofrecemos servicios de transporte seguros, confiables y convenientes para garantizar que los participantes puedan viajar hacia y desde nuestras instalaciones con facilidad. Nuestro transporte está diseñado para acomodar a personas de las áreas circundantes, brindando una experiencia sin estrés y asegurando llegadas puntuales a citas, programas o tratamientos. Este servicio está diseñado para mejorar la accesibilidad y promover una participación fluida en todas las actividades programadas.",
  },
  {
    title: "Nutritional Counseling",
    title_es: "Asesoramiento Nutricional",
    imageKey: "services-page/artistiqueimagery-119.jpg",
    description:
      "Expert advice to promote healthy eating habits and address dietary concerns.",
    description_es:
      "Consejos de expertos para promover hábitos alimenticios saludables y abordar preocupaciones dietéticas.",
    extraImages: [
      "services-page/nc1.jpg",
      "services-page/nc2.jpg",
      "services-page/nc3.jpg",
    ],
    details:
      "We provide expert guidance to help individuals develop and maintain healthy eating habits that support overall well-being. Our nutrition specialists offer personalized advice to address specific dietary concerns, such as food allergies, weight management, and chronic health conditions. Through tailored meal plans and practical tips, we empower clients to make informed choices that lead to a balanced and nutritious lifestyle.",
    details_es:
      "Brindamos orientación experta para ayudar a las personas a desarrollar y mantener hábitos alimenticios saludables que apoyen su bienestar general. Nuestros especialistas en nutrición ofrecen consejos personalizados para abordar preocupaciones dietéticas específicas, como alergias alimentarias, manejo del peso y condiciones de salud crónicas. A través de planes de comidas adaptados y consejos prácticos, empoderamos a los clientes para que tomen decisiones informadas que conduzcan a un estilo de vida equilibrado y nutritivo.",
  },
  {
    title: "Individual Assessment",
    title_es: "Evaluación Individual",
    imageKey: "services-page/artistiqueimagery-101.jpg",
    description:
      "Comprehensive evaluation of each participant’s health and personal needs to create a tailored care plan.",
    description_es:
      "Evaluación integral de la salud y necesidades personales de cada participante para crear un plan de atención personalizado.",
    extraImages: [
      "services-page/ia1.jpg",
      "services-page/ia2.jpg",
      "services-page/ia3.jpg",
      "services-page/ia4.jpg",
      "services-page/ia5.jpg",
      "services-page/ia6.jpg",
    ],
    details:
      "We conduct a thorough evaluation of each participant’s health status, lifestyle, and personal needs to ensure that every aspect of their well-being is considered. Our team of professionals assesses medical history, physical condition, and personal preferences to develop a customized care plan. This individualized approach helps ensure that each participant receives the most effective and appropriate support to meet their unique goals and needs.",
    details_es:
      "Realizamos una evaluación exhaustiva del estado de salud, el estilo de vida y las necesidades personales de cada participante para garantizar que se considere cada aspecto de su bienestar. Nuestro equipo de profesionales evalúa el historial médico, la condición física y las preferencias personales para desarrollar un plan de atención personalizado. Este enfoque individualizado ayuda a garantizar que cada participante reciba el apoyo más eficaz y adecuado para cumplir con sus objetivos y necesidades únicas.",
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
