<template>
    <div class="muso-pagination">
        <a class="item item-first" @click="changePage(page - 1)" :class="{ disabled: isDisabled('back') }">
            <img alt="" src="images/icons/chevron-left.svg"/>
        </a>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <a class="item item-last" @click="changePage(page + 1)" :class="{ disabled: isDisabled('forward') }">
            <img alt="" src="images/icons/chevron-right.svg"/>
        </a>
    </div>
</template>

<script>
    export default {
        name: 'MusoPagination',
        props: {
            totalItems: {
                required: true,
                default: 0,
            },
            currentPage: {
                required: true,
                default: 1,
            },
            setPage: {
                required: true,
                type: Function,
            },
            itemsPerPage: {
                default: 10,
            },
            showBatchButton: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            page() {
                return parseInt(this.currentPage);
            },
            hasPreviousBatch() {
                return this.showBatchButton;
            },
            hasNextBatch() {
                return this.showBatchButton;
            },
            totalPages() {
                return Math.ceil(this.totalItems / this.itemsPerPage) || 1;
            },
            getNumberPages(){
                let numbers = [];
                let start = 1;
                let end = this.totalPages;

                if (this.currentPage <= this.averageCount()) {
                    start = 1;
                    end = this.displayPages;
                }

                if (this.currentPage > this.averageCount() && this.currentPage < this.totalPages - this.averageCount()) {
                    start = this.currentPage - this.averageCount();
                    end = this.currentPage + this.averageCount();
                }

                if (this.currentPage >= this.totalPages - this.averageCount()) {
                    start = this.totalPages - this.displayPages + 1;
                    end = this.totalPages;
                }

                for (start; start <= end; start++) {
                    if (start >= 1 && start <= this.totalPages) {
                        numbers.push(start);
                    }
                }

                return numbers;
            },
        },
        methods: {
            changePage(page) {
                if (page <= this.totalPages && page >= 1) {
                    this.setPage(page);
                }
            },
            isDisabled(direction) {
                return (this.page <= 1 && direction === 'back')
                    || (this.page >= this.totalPages && direction === 'forward');
            },
        },
    };
</script>

<style lang="scss">
    .muso-pagination {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;

        span {
            color: #8A96A0;
        }

        .item {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border: 1px solid #7A7B7E;
            border-radius: 5px;
            cursor: pointer;

            &.item-first {
                margin-right: auto;
            }

            &.item-last {
                margin-left: auto;
            }

            &.disabled {
                cursor: default;
            }
        }
    }
</style>
