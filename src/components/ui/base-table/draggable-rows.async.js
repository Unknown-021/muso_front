export default () => ({
  component: import('./draggable-rows.vue'),
  delay: 0,
  loading: LoadingComponent
});

const LoadingComponent = {
  functional: true,
  render: (h, { children }) => {
    return <tbody>{children}</tbody>;
  }
};