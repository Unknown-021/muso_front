const musoTagRegExp = /\[\/?musoId[^\]]*\]/g;
const musoTagAttrsRegExp = /musoId="(\d+)" type="(\w+)"/;

export const mapMusoLinkTypeToRoute = {
  ARTIST: id => ({
    name: 'artist',
    params: { id }
  }),
  PROFESSIONAL: id => ({
    name: 'profile',
    params: { id }
  })
};

export function stripMusoTags(text) {
  return text.replace(musoTagRegExp, '');
}

export function replaceMustoTagsWithLink(router, text) {
  return text.replace(musoTagRegExp, (tag) => {
    // example: [/musoId]
    // example: [musoId="5606" type="ARTIST"]
    const isOpeningTag = tag.charAt(1) !== '/';

    if (isOpeningTag) {
      return transformMusoTagToLink(router, tag);
    } else {
      return '</a>';
    }
  });
}

function transformMusoTagToLink(router, musoTag) {
  let hrefAttr = '';
  const result = musoTag.match(musoTagAttrsRegExp);

  if (result) {
    const id = result[1];
    const type = result[2];
    const getRoute = mapMusoLinkTypeToRoute[type];
    if (getRoute) {
      const { route } = router.resolve(getRoute(id));
      hrefAttr = route.fullPath;
    }
  }

  return `<a ${hrefAttr ? `href="${hrefAttr}"` : '' }>`;
}
