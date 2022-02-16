import SongSearchResults from 'components/song/search-results';
import ArtistSearchResults from 'components/artist/search-results';
import ProfileSearchResults from 'components/profile/search-results';
import CollectionSearchResults from 'components/collection/search-results';
import LayoutMain from 'components/layouts'
import SongPage from 'pages/song';
import CollectionPage from 'pages/collection';
import AnalyticsPage from 'pages/analytics';
import AnalyticsOverviewTab from 'pages/analytics-overview';
import AnalyticsTrendsTab from 'pages/analytics-trends';
import AnalyticsCatalogTab from 'pages/analytics-catalog';
import PlaylistActivityTab from 'pages/playlist-activity';
import ChartActivityTab from 'pages/chart-activity';
import AnalyticsTracksActivity from 'pages/analytics-track-activity';
import AnalyticsTracksGrouping from 'pages/analytics-track-grouping';
import ProfilePage from 'pages/profile';
import SearchPage from 'pages/search';
import ArtistPage from 'pages/artist';
import NotFoundPage from 'pages/not-found';
import AuthLogin from 'pages/auth-login';
import SubscriptionPage from 'pages/subscription';
import ShoppingCart from 'components/subscription/shopping-cart';
import ShoppingCheckout from 'components/subscription/shopping-checkout';
import CongratsCard from 'components/subscription/congrats-card';
import AuthRequestPassword from 'pages/auth-request-password';
import AuthResetPassword from 'pages/auth-reset-password';
import { getHomeRedirect } from '../router.landing-redirection';
import { redirectIfProUser } from '../../helpers/routing';

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

export const routes = [{
  path: '',
  name: 'home',
  component: {
    name: 'home-page',
    serverPrefetch() {
      const route = getHomeRedirect(this.$store);
      this.$serverRedirect(302, route);
    },
    render: () => null
  }
},
  {
    path: '/login',
    name: 'login',
    component: AuthLogin,
    meta: {
      logout: route => 'code' in route.query,
      guestOnly: true
    }
  },
  {
    path: '/password-forgot',
    name: 'password-forgot',
    component: AuthRequestPassword
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: AuthResetPassword,
    props: (route) => ({
      resetCode: route.query.code
    })
  },
  {
    path: '/auth/apple',
    name: 'auth-apple',
    component: () => import('pages/auth-apple.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import( /* webpackChunkName: "project" */ 'components/project'),
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    component: () => import( /* webpackChunkName: "static-page" */ 'components/privacy-policy/index'),
  },
  {
    path: '/privacy-policy/facebook',
    name: 'privacy-policy-facebook',
    component: () => import( /* webpackChunkName: "static-page" */ 'components/privacy-policy/facebook'),
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import( /* webpackChunkName: "static-page" */ 'components/privacy-policy/terms'),
  },
  {
    path: '',
    component: LayoutMain,
    children: [
      {
        ...search,
        component: SearchPage
      },
      {
        path: 'analytics',
        component: AnalyticsPage,
        props: route => ({
          profileId: route.params.id
        }),
        meta: {
          requiresAuth: route => !route.params.id,
          cache: true,
          background: 'accent-3'
        },
        children: [{
          path: ':id?/trends',
          name: 'analytics-trends',
          component: AnalyticsTrendsTab
        }, {
          path: ':id?/catalog',
          name: 'analytics-catalog',
          component: AnalyticsCatalogTab,
          props: (route) => ({
            groupBy: route.query.groupBy
          })
        }, {
          path: ':id?/activity-playlists',
          name: 'playlist-activity',
          component: PlaylistActivityTab,
          props: (route) => ({
            groupByQuery: route.query.groupBy
          })
        }, {
          path: ':id?/activity-charts',
          name: 'chart-activity',
          component: ChartActivityTab,
          props: (route) => ({
            groupByQuery: route.query.groupBy
          })
        },{
          path: ':id?',
          name: 'analytics',
          component: AnalyticsOverviewTab
        }, {
          path: ':id?/catalog/albums/:entityId',
          name: 'albums',
          component: AnalyticsTracksGrouping,
          props: (route) => ({
            entityId: route.params.entityId,
            id: route.params.id
          })
        }, {
          path: ':id?/catalog/collaborators/:entityId',
          name: 'collaborators',
          component: AnalyticsTracksGrouping,
          props: (route) => ({
            entityId: route.params.id,
            id: route.params.id
          })
        }, {
          path: ':id?/catalog/credits/:entityId',
          name: 'credits',
          component: AnalyticsTracksGrouping,
          props: (route) => ({
            entityId: route.params.id,
            id: route.params.id
          })
        },]
      },
      {
        path: 'activity/track/:trackId',
        name: 'activity',
        component: AnalyticsTracksActivity,
        props: (route) => ({
          trackId: route.params.trackId
        }),
        meta: {
          background: 'accent-3'
        },
      }, 
      {
        path: 'subscription',
        component: SubscriptionPage,
        meta: {
          requiresAuth: true,
          showAppHeaderOnMobile: false,
          logout: route => 'appToken' in route.query,
          cache: true
        },
        children: [{
          path: '',
          name: 'subscription',
          component: ShoppingCart,
          meta: {
            authRedirect: redirectIfProUser
          }
        }, {
          path: 'checkout',
          name: 'shopping-checkout',
          component: ShoppingCheckout,
          meta: {
            authRedirect: redirectIfProUser
          }
        }, {
          path: 'success',
          name: 'shopping-success',
          component: CongratsCard
        }]
      },
      {
        ...trackSearchResults,
        component: SongSearchResults
      },
      {
        ...track,
        component: SongPage
      },
      {
        ...artistSearchResults,
        component: ArtistSearchResults
      },
      {
        ...artist,
        component: ArtistPage
      },
      {
        ...profileSearchResults,
        component: ProfileSearchResults
      },
      {
        ...profile,
        component: ProfilePage
      },
      {
        ...albumSearchResults,
        component: CollectionSearchResults
      },
      {
        ...album,
        component: CollectionPage
      }
    ],
  },
  {
    path: '',
    component: LayoutMain,
    children: [
      {
        path: 'not-found',
        name: 'not-found',
        component: NotFoundPage
      },
      {
        path: '*',
        component: NotFoundPage
      }
    ]
  }
];
