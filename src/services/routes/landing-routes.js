import {
  artist,
  profile,
  track,
  album
} from './modules/entities';
import {
  search,
  albumSearchResults,
  artistSearchResults,
  profileSearchResults,
  trackSearchResults
} from './modules/search';

// Async page components doesn't work with SSR (should be fixed later), that's why we separate routes
// for web app and landing search.
// We will render entity pages on different domain, that's why we can user empty pages
const EmptyPage = {
  functional: true,
  render: () => null
};

export const routes = [
  {
    path: '',
    component: EmptyPage,
    children: [
      {
        ...search,
        component: EmptyPage
      },
      {
        ...trackSearchResults,
        component: EmptyPage
      },
      {
        ...track,
        component: EmptyPage
      },
      {
        ...artistSearchResults,
        component: EmptyPage
      },
      {
        ...artist,
        component: EmptyPage
      },
      {
        ...profileSearchResults,
        component: EmptyPage
      },
      {
        ...profile,
        component: EmptyPage
      },
      {
        ...albumSearchResults,
        component: EmptyPage
      },
      {
        ...album,
        component: EmptyPage
      }
    ]
  }
];
