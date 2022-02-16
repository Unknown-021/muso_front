<template>
  <section :class="creditsClass">
    <h3 class="credits-card__title">
      <component v-if="icon" :is="icon" class="credits-card__icon" width="20" />
      {{ title }} ({{ collaboratorsCount }})
    </h3>

    <div v-if="associations.length" class="credits-card__inner">
      <ul class="credits-card__list">
        <template v-for="item in associations">
          <li class="credits-card__assoc-item" :key="item.id">
            <h4 v-if="item.id" class="credits-card__assoc-name">{{ item.association }}</h4>

            <template v-for="collaborator in item.collaborators">
              <credits-collaborator :key="collaborator.id" :collaborator="collaborator" :association-id="item.id" />
            </template>
          </li>
        </template>
      </ul>

      <plain-button v-if="needToShowMoreButton" class="credits-card__more" @click="toggleShowing">
        {{ isShowingAll ? 'View Less' : 'View More' }}
      </plain-button>
    </div>
  </section>
</template>

<script>
import CreditsCollaborator from './credits-collaborator.vue';
import PlainButton from 'components/ui/base-plain-button/base-plain-button.vue';
import { saveScrollPosition } from 'helpers/dom';
import { creditsCategoryIconMap } from 'store/modules/credits.constants';
import { limitArrayByObjectProperty, isAssociationArraysEqual, countCollaborators } from './credits-card.utils';

const MAX_COLLABORATORS_COUNT = 10;

export const props = {
  type: {
    type: String,
    required: true,
    validator(value) {
      return ['song', 'album'].includes(value);
    }
  },
  creditsItem: {
    type: Object,
    required: true
  }
};

export default {
  name: 'credits-card',
  components: {
    CreditsCollaborator,
    PlainButton
  },
  props,
  provide() {
    return {
      creditsCard: {
        type: this.type,
        isUnassigned: this.isUnassigned
      }
    };
  },
  data() {
    return {
      isShowingAll: false
    };
  },
  computed: {
    creditsClass() {
      return {
        'credits-card': true,
        'credits-card--empty': this.collaboratorsCount === 0,
        'credits-card--unassigned': this.isUnassigned
      };
    },
    icon() {
      return creditsCategoryIconMap[this.creditsItem.tag];
    },
    isUnassigned() {
      return this.creditsItem.tag === 'unassigned';
    },
    title() {
      return this.isUnassigned ? 'Unassigned' : this.creditsItem.association;
    },
    collaboratorsCount() {
      return countCollaborators(this.creditsItem.list);
    },
    needToShowMoreButton() {
      return !isAssociationArraysEqual(this.creditsItem.list, this.limitedAssociations);
    },
    associations() {
      return this.isShowingAll ? this.creditsItem.list : this.limitedAssociations;
    },
    limitedAssociations() {
      return limitArrayByObjectProperty(this.creditsItem.list, 'collaborators', MAX_COLLABORATORS_COUNT);
    },
  },
  methods: {
    toggleShowing() {
      saveScrollPosition(() => {
        this.isShowingAll = !this.isShowingAll;
      });
    }
  }
}
</script>

<style lang="scss">
:root {
  --credits-card-top: 0;
}

.credits-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    max-width: 450px;
  }
  &__icon {
    margin-right: 10px;
    max-width: 20px;
    max-height: 20px;
    &:not([stroke]) {
      fill: currentColor;
    }
    &[stroke] {
      stroke: currentColor;
    }
  }
  &__title {
    display: flex;
    align-items: center;
    position: sticky;
    z-index: 2;
    top: var(--credits-card-top);
    padding: 15px;
    min-height: 50px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
    color: #FFF;
    background-color: #151413;
    @at-root {
      .credits-card--unassigned & {
        border: 1px solid #272625;
        background-color: #040302;
      }
      .credits-card--empty & {
        color: #8F8F8F;
      }
    }
  }
  &__inner {
    background-color: #1d1c1b;
    @at-root {
      .credits-card--unassigned & {
        border: 1px solid #272625;
        border-top: none;
        background-color: #040302;
      }
    }
  }
  &__list {
    margin-top: 0;
    margin-bottom: 0;
    padding: 10px 0 5px;
    list-style: none;
  }
  &__assoc-item {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 5px;
    }
  }
  &__assoc-name {
    margin: 0 10px 5px;
    padding: 1px 4px 1px;
    font-weight: 500;
    color: #8F8F8F;
  }
  &__more {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: -4px;
    margin-bottom: 13px;
  }
}
</style>