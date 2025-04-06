import icons from '@/constants/icons';
import { ImageSourcePropType } from 'react-native';

//dummy button categories data
export const buttonCategories = [
  { id: 1, label: 'Promotion' },
  { id: 2, label: 'Transfer Notices' },
  { id: 3, label: 'Directives' },
  { id: 4, label: 'Rules' },
  { id: 5, label: 'Exam Schedule' },
  { id: 6, label: 'Order' },
  { id: 7, label: 'General Notice' },
  { id: 8, label: 'Law' },
  { id: 9, label: 'Public Procurement' },
];

//card item interface
export interface CardItem {
  title: string;
  icon: ImageSourcePropType | undefined;
}

// dummy data for the card items
export const data: CardItem[] = [
  { title: 'Cyber Bullying', icon: icons.cyberbullying },
  { title: 'Domestic Measurement', icon: icons.domesticviolence },
  { title: 'Drug Abuse', icon: icons.drugabuse },
  { title: 'Bribery', icon: icons.bribery },
  { title: 'Scam', icon: icons.scam },
  { title: 'Theft', icon: icons.theft },
  { title: 'Kidnap', icon: icons.kidnap },
  { title: 'Sexual Violence', icon: icons.sexualviolence },
  { title: 'Missing Person', icon: icons.missingperson },
  { title: 'Traffic Rule Violation', icon: icons.trafficviolation },
  { title: 'Arms / Weapons', icon: icons.arms },
  { title: 'Others', icon: icons.others },
];

// dummy data for the card items
export const emergencyData = [
  { title: 'Blood donation', icon: icons.blooddonation },
  { title: 'Fire Brigade', icon: icons.firetruck },
  { title: 'Ambulance', icon: icons.ambulance },
];

// Card items props types
type CardItems = {
  title: string;
  name: string;
  description: string;
  path?: string;
};

// card items
export const cardItems: CardItems[] = [
  {
    title: 'Card 1',
    name: 'clipboard-list-outline',
    description: 'Report Incident',
    path: 'report-incident',
  },
  {
    title: 'Card 2',
    name: 'notification',
    description: 'Notice/Alerts',
    path: 'notice',
  },
  {
    title: 'Card 3',
    name: 'report',
    description: 'My incidents',
    path: 'my-incident',
  },
  {
    title: 'Card 4',
    name: 'police-station',
    description: 'Police Stations Nearby',
    path: 'police-station',
  },
];
