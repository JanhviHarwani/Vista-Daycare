import { ReactNode } from "react";

export type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
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
export type MediaType = 'video' | 'image';

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
    type: 'video',
    key: 'landing-page/full_day_care.MP4',
    caption: "A Day in Life at Vista Adult Day Care",
  },
  {
    type: 'video',
    key: 'landing-page/Gym.MP4',
    caption: "Our Modern Facilities",
  },
  {
    type: 'image',
    key: 'landing-page/happy_faces.jpg',
    caption: "Happy Faces",
  },
  {
    type: 'image',
    key: 'landing-page/team.jpg',
    caption: "Our Team",
  }
];
// New Testimonial types
export type Testimonial = {
  name: string;
  text: string;
  rating: number;
  role: string;
  imageKey: string;
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
    imageKey: "landing-page/Paco.jpg"
  },
  {
    name: "Yolanda Perez",
    text: "I've been coming here for 10 years now and have made so many friends. I keep coming back here because I feel regenerated and I feel good and like I did something. It just does good for me when I go back home!",
    rating: 5,
    role: "Long-term Member",
    imageKey: "landing-page/yolanda.jpg"
  },
  {
    name: "Raul Moreno",
    text: "This center has impacted me in a great way due to my accident in the past. They focused on taking care of me, making sure I was mentally, physically, and emotionally good. I have been here for 19 years and their care for me is unwavering.",
    rating: 5,
    role: "Long-term Member",
    imageKey: "landing-page/raul.jpg"
  }

];


//Services Provided
export type Services = {
  title: string;
  imageKey: string;
  description: string
};

export type ServiceUrl = Services & {
  imageUrl: string;
};

export const serviceData: Services[] = [
  {
    title:"Health Services",
    imageKey: "services-page/artistiqueimagery-097.jpg",
    description:"Support and counseling to address emotional and physical well-being and mental health challenges."
  },
  {
    title:"Professional Nursing Services",
    imageKey: "services-page/artistiqueimagery-133.jpg",
    description:"Skilled nursing care to monitor and manage medical conditions and treatments."
  },
  {
    title:"Activities",
    imageKey: "services-page/artistiqueimagery-080.jpg",
    description:"Engaging programs designed to stimulate cognitive and physical health."
  },
  {title:"Transportation",
    imageKey: "services-page/artistiqueimagery-117.jpg",
    description:" We provide safe and convenient transportation to and from the facility for participants from surrounding areas."
  },
  {
    title:"Nutritional Counseling",
    imageKey: "services-page/artistiqueimagery-119.jpg",
    description:"Expert advice to promote healthy eating habits and address dietary concerns."
  },
  {  title:"Individual Assessment",
    imageKey: "services-page/artistiqueimagery-101.jpg",
    description:"Comprehensive evaluation of each participant’s health and personal needs to create a tailored care plan."
  },

];

export interface Event {
  id: number;
  event_name: string;
  event_date: string;
  end_time: string;
  isHighlight: boolean;
}

export interface Meal {
  meal_date: string;
  meal_name: string;
  quantity: string;
}
export interface Contact {
  id:number;
  date:string; 
  name:string;
  phone:string;
  email:string;
}
// Interface for the API response
export interface ContactsApiResponse {
  contacts: Contact[];
}