<script>
import { Doughnut } from 'vue-chartjs';
import NumberFilter from 'filters/number';

const defaultOptions = {
  responsive: true,
  legend: {
    position: "right",
    display: false,
  },
  elements: {
    center: {
      color: "#FFF",
      fontStyle: "Inter",
      sidePadding: 20,
      fontSize: 20,
      lineHeight: "130%",
    },
  },
  animation: {
    duration: 0,
  },
  hover: {
    animationDuration: 0,
  },
  responsiveAnimationDuration: 0,
  cutoutPercentage: 70,
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var label = data.labels[tooltipItem.index] || '';

        if (label) {
            label += ': ';
        }

        label += NumberFilter(data.datasets[0].data[tooltipItem.index], true);
        return label;
      }
    }
  }
};

export default {
  name: 'pie-chart',
  extends: Doughnut,
  props: {
    labels: {
      type: Array,
      required: true
    },
    dataset: {
      type: Object,
      required: true
    },
    activeSegmentIndex: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.render();
  },
  watch: {
    activeSegmentIndex() {
      this.render();
    },
    dataset: {
      deep: true,
      handler() {
        this.render();
      }
    }
  },
  computed: {
    segmentsColors() {
      return this.dataset.data.map((item, index) => this.getSegmentColor(index));
    }
  },
  methods: {
    render() {
      const dataset = {
        ...this.dataset,
        backgroundColor: this.segmentsColors
      };
      const data = {
        labels: this.labels,
        datasets: [dataset]
      };
      const options = {
        ...defaultOptions,
        onClick: this.click
      };

      this.renderChart(data, options);
    },
    click(point, event) {
      this.$emit('segment-click', event[0]);
    },
    getSegmentColor(index) {
      return index === this.activeSegmentIndex ? '#6BE7C8' : '#21201F';
    }
  }
};
</script>