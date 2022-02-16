export function updateQuery(router, query) {
  const { path, query: currQuery } = router.currentRoute;
  router.push({
    path,
    query: {
      ...currQuery,
      ...query
    }
  });
}

export default {
  goToItemPage(routeName, id, keyword = null) {
    if (this.$route.name == routeName && this.$route.params.id == id) {
      return;
    }
    this.$router.push({ name: routeName, params: { id }, query: { keyword } });
  },
  getItemPageRoute(routeName, id, keyword = null) {
    return {
      name: routeName,
      params: { id },
      query: { keyword }
    };
  }
}

export function getCollaboratorRoute({ id, name, label }) {
  return {
    name: label === 'professional' ? 'profile' : label,
    params: { id },
    query: {
      keyword: name
    }
  };
}

export function songRoute({ id }) {
  return {
    name: 'song',
    params: { id }
  };
}

export function analyticsTrendsRoute ({ id }) {
  return {
    name: 'analytics-trends',
    query: { id },
  };
}

export function albumRoute({ id, title }) {
  return {
    name: 'collection',
    params: {
      id
    },
    query: {
      keyword: title
    }
  };
}

export function albumGroupingRoute({ id }, demoProfileId ) {
  return {
    name: 'albums',
    params: {
      entityId: id,
      id: demoProfileId
    }
  };
}

export function collabotatorsGroupingRoute({ id }, demoProfileId) {
  return {
    name: 'collaborators',
    params: {
      entityId: id,
      id: demoProfileId
    }
  };
}

export function creditsGroupingRoute({ id }, demoProfileId) {
  return {
    name: 'credits',
    params: {
      entityId: id,
      id: demoProfileId
    }
  };
}

export function artistRoute({ id }) {
  return {
    name: 'artist',
    params: { id }
  };
}

export function profileRoute({ id }) {
  return {
    name: 'profile',
    params: { id }
  };
}

export function redirectIfProUser(user) {
  if (user.subscriptionStatus === 'PRO') {
    return profileRoute(user);
  }
}

export function redirectIfNonProUser(user) {
  if (user.subscriptionStatus !== 'PRO') {
    return profileRoute(user);
  }
}

export function trackActivityRoute({ id }) {
  return {
    name: 'activity',
    params: { 
      trackId: id 
    }
  };
}
