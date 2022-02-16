import Mic from 'assets/images/icons/mic.svg';
import MusicNote from 'assets/images/icons/music-note.svg';
import HalfCirlce from 'assets/images/icons/half-circle.svg';
import PianoKeyboard from 'assets/images/icons/piano-keyboard.svg';
import SlidersVertical from 'assets/images/icons/sliders-vertical.svg';
import Image from 'assets/images/icons/image.svg';
import Users from 'assets/images/icons/users.svg';
import Buildings from 'assets/images/icons/buildings.svg';
import Suitcase from 'assets/images/icons/suitcase.svg';

export const creditsCategoryIconMap = {
  'artists': Mic,
  'songwriters': MusicNote,
  'producers': HalfCirlce,
  'musicians': PianoKeyboard,
  'engineers': SlidersVertical,
  'visual': Image,
  'other': Users,
  'management': Suitcase,
  'labelsPublisher': Buildings,
  'unassigned': null
};

export const unassignedAssociation = {
  id: null,
  tag: 'unassigned',
  name: 'Unassigned'
};

export const parentAssociations = [
  {
    id: 'Artist',
    tag: 'artists',
    name: 'Artists'
  }, {
    id: 'Songwriter',
    tag: 'songwriters',
    name: 'Songwriters'
  }, {
    id: 'Producers & Arrangers',
    tag: 'producers',
    name: 'Producers'
  }, {
    id: 'Musician',
    tag: 'musicians',
    name: 'Musicians'
  }, {
    id: 'Engineer',
    tag: 'engineers',
    name: 'Engineers'
  }, {
    id: 'Visual',
    tag: 'visual',
    name: 'Visual'
  }, {
    id: 'Management',
    tag: 'management',
    name: 'Management'
  }, {
    id: 'Organization',
    tag: 'labelsPublisher',
    name: 'Labels & Publisher'
  }, {
    id: 'Other',
    tag: 'other',
    name: 'Other'
  },
  unassignedAssociation
];
