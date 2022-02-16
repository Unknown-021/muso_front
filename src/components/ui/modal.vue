<template>
    <div class="modal" tabindex="-1" @click="backdropClicked" v-if="modalShown">
        <div class="modal-dialog" :class="modalSizeClass" @click.stop>
            <slot name="modal-content" class="modal-content">
                <div class="modal-content">
                    <slot name="modal-header" v-if="header">
                        <div class="modal-header">
                            <div class="modal-title">
                                <slot name="modal-title">{{ title }}</slot>
                            </div>
                            <button type="button" class="close" @click="toggle(false)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </slot>
                    <slot name="modal-body">
                        <div class="modal-body"></div>
                    </slot>
                    <slot name="modal-footer" v-if="footer">
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" @click="toggle(false, 'cancel')">
                                <span>{{ cancelText }}</span>
                            </button>
                            <button
                                type="button"
                                class="btn"
                                @click="toggle(false, 'ok')"
                                data-action="auto-focus"
                            >
                                <span>{{ okText }}</span>
                            </button>
                        </div>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import utils from './utils';

    const CLASS_MODAL_OPEN = 'modal-open';
    const BACKDROP_STATIC = 'static';

    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            modalDialogClassName: {
                type: String
            },
            className: {
                type: String
            },
            size: {
                type: String
            },
            backdrop: {
                type: [Boolean, String],
                default: true
            },
            footer: {
                type: Boolean,
                default: true
            },
            header: {
                type: Boolean,
                default: true
            },
            cancelText: {
                type: String
            },
            additionalCssClass: {
                type: String
            },
            okText: {
                type: String
            },
            transitionDuration: {
                type: Number,
                default: 150
            },
            autoFocus: {
                type: Boolean,
                default: false
            },
            keyboard: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                msg: '',
                timeoutId: 0,
                modalShown: this.show,
            };
        },
        computed: {
            modalSizeClass() {
                let classes = [
                    this.modalDialogClassName ? this.modalDialogClassName : '',
                ];
                if (this.size) {
                    classes.push(`modal-${this.size}`);
                }
                return classes;
            }
        },
        watch: {
            value(v) {
                this.modalShown = v;
                this.$toggle(v);
            }
        },
        mounted() {
            utils.on(window, utils.events.KEY_UP, this.onKeyPress);
            if (this.value) {
                this.$toggle(true);
            }
            this.$on('modal:close', this.close);
        },
        beforeDestroy() {
            clearTimeout(this.timeoutId);
            utils.off(window, utils.events.KEY_UP, this.onKeyPress);
        },
        methods: {
            onKeyPress(event) {
                if (this.keyboard && this.value && event.keyCode === 27) {
                    this.toggle(false);
                }
            },
            toggle(show, msg) {
                this.msg = msg;
                this.$emit('input', show);
                this.modalShown = show;
            },
            close() {
                this.toggle(false);
            },
            $toggle(show) {
                clearTimeout(this.timeoutId);
                if (show) {
                    this.modalShown = true;
                    utils.toggleBodyOverflow(false);
                    utils.addClass(document.body, CLASS_MODAL_OPEN);
                    this.timeoutId = setTimeout(() => {
                        if (this.autoFocus) {
                            let btn = this.$el.querySelector('[data-action="auto-focus"]');
                            if (btn) {
                                btn.focus();
                            }
                        }
                        this.$emit('show');
                        this.timeoutId = 0;
                    }, this.transitionDuration);
                } else {
                    this.modalShown = false;
                    this.timeoutId = setTimeout(() => {
                        utils.removeClass(document.body, CLASS_MODAL_OPEN);
                        utils.toggleBodyOverflow(true);
                        this.$emit('hide', this.msg || 'dismiss');
                        this.msg = '';
                        this.timeoutId = 0;
                    }, this.transitionDuration);
                }
            },
            backdropClicked() {
                if (this.backdrop !== BACKDROP_STATIC) {
                    this.toggle(false);
                }
            }
        }
    }
</script>

<style lang="scss">
    body {
        &.modal-open {
            overflow: hidden;
        }
    }

    .modal {
        display: flex !important;
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        outline: 0;
        z-index: 10000;
        overflow-y: auto;
        background-color: rgba(0, 0, 0, 0.5);

        .modal-dialog {
            width: 100%;

            .modal-content {
                border-radius: 3px;

                .modal-header {
                    .modal-title {
                        margin-bottom: 0;
                        line-height: 1.5;
                    }
                }

                .modal-footer {
                    border-top: 1px solid #c2cfd6;
                }
            }
        }
    }
</style>
