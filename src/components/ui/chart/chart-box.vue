<script>
import { pick, createArray } from 'helpers/array';
import { min, max } from 'helpers/number';

export default {
  name: 'chart-box',
  props: {
    data: {
      type: Array,
      required: true
    },
    axisX: {
      type: Object,
      required: true
    },
    axisY: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      width: NaN,
      height: NaN
    };
  },
  mounted() {
    this.$nextTick(this.calcSize);
  },
  computed: {
    getX() {
      return val => ((val - this.minX) / (this.maxX - this.minX) * this.width) || 0;
    },
    getY() {
      return val => this.height - ((val - this.minY) / (this.maxY - this.minY) * this.height) || 0;
    },
    getPoint() {
      return (d) => ({
        x: this.getX(d.x),
        y: this.getY(d.y)
      });
    },
    points() {
      return this.data.map(this.getPoint);
    },
    minX() {
      return min(this.data, 'x');
    },
    dataMaxX() {
      return max(this.data, 'x');
    },
    maxX() {
      return this.axisX.max || this.dataMaxX || this.axisX.maxEmpty || 1;
    },
    dataMinY() {
      return min(this.data, 'y');
    },
    minY() {
      return Number.isFinite(this.axisY.min)
        ? this.axisY.min
        : this.dataMinY;
    },
    dataMaxY() {
      return max(this.data, 'y');
    },
    maxY() {
      return this.axisY.max || this.dataMaxY || this.axisY.maxEmpty || 1;
    },
    xTicks() {
      // return getTicks(this.axisX.tickCount || this.data.length, this.minX, this.maxX);
      return pick(this.data, this.axisX.tickCount).map(item => +item.x);
    },
    xTicksPoints() {
      return this.xTicks.map(this.getX);
    },
    yTicks() {
      return getTicks(this.axisY.tickCount, this.minY, this.maxY).reverse();
    },
    yTicksPoints() {
      return this.yTicks.map(this.getY);
    },
    gridColumnGap() {
      return this.width / (this.xTicks.length - 1);
    },
    gridRowGap() {
      return this.height / (this.yTicks.length - 1);
    }
  },
  methods: {
    calcSize() {
      const { clientWidth, clientHeight } = this.getBoxEl();
      this.width = clientWidth;
      this.height = clientHeight;
    },
    getBoxEl() {
      throw Error('getBoxEl method should be implemented by extended component');
    }
  }
};

function getTicks(count, min, max) {
  const divider = Math.max(count - 1, 1);
  const step = getStep(max - min, divider);
  return createArray(count, i => {
    return min + (step * i);
  });
}

function getStep(count, divider) {
  if (divider >= count) {
    return count / divider;
  }
  const reminder = count % divider;
  const step = (count - reminder) / divider;
  return Math.max(step, 1);
}
</script>
