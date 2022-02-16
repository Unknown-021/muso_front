<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    class="menu-item-icon"
    aria-hidden="true"
  />
</template>

<script>
import UserTimes from 'assets/images/icons/user-times.svg';
import UserAdd from 'assets/images/icons/user-add.svg';
import ArrowTurnRight from 'assets/images/icons/arrow-turn-right-2.svg';
import ArrowExchange from 'assets/images/icons/arrow-exchange.svg';
import Pen from 'assets/images/icons/pen-2.svg';
import Lock from 'assets/images/icons/lock.svg';
import Export from 'assets/images/icons/export.svg';
import Bin from 'assets/images/icons/bin.svg';
import Mic from 'assets/images/icons/mic-new.svg';
import { assert } from 'helpers/utils';

const mapIcon = {
  'mic': Mic,
  'user-times': UserTimes,
  'user-add': UserAdd,
  'arrow-turn-right': ArrowTurnRight,
  'arrow-exchange': ArrowExchange,
  'pen': Pen,
  'lock': Lock,
  'bin': Bin,
  'export': Export
};

export default {
  name: 'menu-icon',
  props: {
    name: {
      type: String,
      default: undefined,
      validator(value) {
        assert(value in mapIcon, `Unknown icon name "${value}". Supported values: ${Object.keys(mapIcon)}`);

        return value in mapIcon;
      }
    }
  },
  computed: {
    iconComponent() {
      return mapIcon[this.name];
    }
  }
}
</script>

<style lang="scss">
.menu-item-icon,
.menu-item-cascade-icon {
  margin-top: -1px;
  margin-bottom: -1px;
  width: 20px;
  height: 20px;
}
.menu-item-icon {
  margin-right: 10px;
  &:not([stroke]) {
    fill: var(--menu-item-icon-color);
  }
  &[stroke] {
    stroke: var(--menu-item-icon-color);
  }
}
.menu-item-cascade-icon {
  position: absolute;
  right: 15px;
}
</style>