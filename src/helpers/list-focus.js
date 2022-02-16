import { shiftIndex } from 'helpers/array';
import { scrollToTheCenterOfParent } from 'helpers/dom';

export class ListFocus {
  constructor(options) {
    this.index = -1;
    this.getItems = options.getItems;
    this.focusedItem = null;
  }

  reset() {
    this.index = -1;
    this.setFocusedItem(null);
  }

  setFocusedItem(item) {
    if (this.focusedItem) {
      delete this.focusedItem.dataset.focused;
    }
    this.focusedItem = item;
    if (this.focusedItem) {
      this.focusedItem.dataset.focused = 'true';
    }
  }

  next() {
    this.shiftFocus('forward');
  }

  prev() {
    this.shiftFocus('backward');
  }

  shiftFocus(direction) {
    const items = this.getItems();
    this.index = this.shiftFocusIndex(direction, items);
    this.setFocusedItem(items[this.index]);
  }

  shiftFocusIndex(direction, items) {
    let newFocusIndex = this.index;
    const length = items.length;
    let i = 0;

    for (i = 0; i < length; ++i) {
      newFocusIndex = shiftIndex(direction, newFocusIndex, length);
      const item = items[newFocusIndex];
      if (!this.isItemDisabled(item)) break;
    }

    const isAllItemsDisabled = (i === length);
    return isAllItemsDisabled ? -1 : newFocusIndex;
  }

  isItemDisabled(item) {
    return item.dataset.disabled === 'true';
  }

  scrollToFocusedElement() {
    const el = this.focusedItem || this.getItems()[0];
    if (el) {
      scrollToTheCenterOfParent(el);
    }
  }
}
