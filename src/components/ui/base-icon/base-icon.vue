<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    aria-hidden="true"
    v-bind="$attrs"
  />
</template>

<script>
import UserTimes from 'assets/images/icons/user-times.svg';
import UserAdd from 'assets/images/icons/user-add.svg';
import Pen from 'assets/images/icons/pen-2.svg';
import Lock from 'assets/images/icons/lock.svg';
import Export from 'assets/images/icons/export.svg';
import Bin from 'assets/images/icons/bin.svg';
import Mic from 'assets/images/icons/mic-new.svg';
import SortAlpha from 'assets/images/icons/sort-alpha.svg';
import Calendar from 'assets/images/icons/calendar.svg';
import SortAmountDown from 'assets/images/icons/sort-amount-down.svg';
import Plus from 'assets/images/icons/plus.svg';
import Minus from 'assets/images/icons/minus.svg';
import Check from 'assets/images/icons/check.svg';
import Success from 'assets/images/icons/success.svg';
import ArrowTurnRight from 'assets/images/icons/arrow-turn-right-2.svg';
import ArrowDown from 'assets/images/icons/arrow-down-new.svg';
import ArrowExchange from 'assets/images/icons/arrow-exchange.svg';
import ArrowLeft from 'assets/images/icons/arrow-left.svg';
import ArrowRight from 'assets/images/icons/arrow-right.svg';
import ChevronLeft from 'assets/images/icons/chevron-left.svg';
import ChevronRight from 'assets/images/icons/chevron-right.svg';
import PieChart from 'assets/images/zero-state/pie-chart.svg';
import Union from 'assets/images/icons/union.svg';
import ProfileDefault from 'assets/images/default-avatars/profile_default.svg'
import ProfileDefaultSmall from 'assets/images/default-avatars/profile_default_small.svg';
import Activity from 'assets/images/zero-state/no-data/activity.svg';
import Analytics from 'assets/images/zero-state/no-data/analytics.svg';
import Collaborators from 'assets/images/zero-state/no-data/collaborators.svg';
import List from 'assets/images/zero-state/no-data/list.svg';
import Streams from 'assets/images/zero-state/no-data/streams.svg';
import AddCross from 'assets/images/icons/add-cross.svg';
import ArrowsUpDown from 'assets/images/icons/arrows_up_down.svg';
import Songwriter from 'assets/images/icons/credits/composer.svg';
import Musician from 'assets/images/icons/credits/drums.svg';
import Artist from 'assets/images/icons/credits/featured_artist.svg';
import Management from 'assets/images/icons/credits/manager.svg';
import Engineer from 'assets/images/icons/credits/mixin.svg';
import Producer from 'assets/images/icons/credits/producer.svg';
import Other from 'assets/images/icons/credits/other.svg';
import Organization from 'assets/images/icons/credits/organization.svg';
import Visual from 'assets/images/icons/credits/visual.svg';

import { assert } from 'helpers/utils';

const mapIcon = {
  'mic': Mic,
  'user-times': UserTimes,
  'user-add': UserAdd,
  'pen': Pen,
  'lock': Lock,
  'bin': Bin,
  'export': Export,
  'sort-alpha': SortAlpha,
  'sort-amount-down': SortAmountDown,
  'calendar': Calendar,
  'plus': Plus,
  'minus': Minus,
  'check': Check,
  'success': Success,
  'arrow-turn-right': ArrowTurnRight,
  'arrow-down': ArrowDown,
  'arrow-exchange': ArrowExchange,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'pie-chart': PieChart,
  'union' : Union,
  'profile-default' : ProfileDefault,
  'profile-default-small' : ProfileDefaultSmall,
  'activity' : Activity,
  'analytics' : Analytics,
  'collaborators' : Collaborators,
  'list' : List,
  'streams' : Streams,
  'add-cross': AddCross,
  'arrows-up-down' : ArrowsUpDown,
  'Songwriter': Songwriter,
  'Musician': Musician,
  'Artist': Artist,
  'Management': Management,
  'Engineer': Engineer,
  'Producers & Arrangers': Producer,
  'Other': Other,
  'Organization': Organization,
  'Visual': Visual
};

export default {
  name: 'base-icon',
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
