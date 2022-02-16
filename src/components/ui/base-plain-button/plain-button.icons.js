export const iconAttrsMap = {
  export: {
    width: 20,
    class: 'btn-icon--tall'
  },
  plus: {
    width: 12
  }
};

export function getIconAttrs(icon) {
  const iconData = iconAttrsMap[icon];
  return iconData || { width: 20 };
}