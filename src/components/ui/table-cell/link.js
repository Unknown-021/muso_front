export default {
  name: 'table-cell-link',
  functional: true,
  props: {
    text: {
      type: String,
      required: true,
    },
    route: {
      type: [String, Object],
      required: true
    },
    processing: {
      type: Boolean
    }
  },
  render(h, { props, data }) {
    return (
      <router-link class="ellipsis" to={props.route} {...data}>
        { props.text }
      </router-link>
    );
  }
}
