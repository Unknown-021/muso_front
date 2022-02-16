export function createMenuItem(componentName, itemComponents) {
  const itemComponentsMap = {};
  itemComponents.forEach(item => {
    itemComponentsMap[item.name] = item;
  });

  const actions = itemComponents.map(item => item.name);

  return {
    name: componentName,
    functional: true,
    props: {
      action: {
        type: String,
        required: true,
        validator: value => actions.includes(value)
      }
    },
    render(h, { props, data, children }) {
      const ItemComponent = itemComponentsMap[props.action];
      return <ItemComponent {...data}>{ children }</ItemComponent>
    }
  };
}
