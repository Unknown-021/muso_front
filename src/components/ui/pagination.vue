<template>
    <ul class="pagination" v-if="totalItems">
        <li class="page-item item-first" :class="{disabled: isDisabled(page, 'back')}" @click="changePage(1)">
            <a class="page-link" href="javascript:void(0)">&laquo;</a>
        </li>
        <li
            class="page-item item-previous"
            :class="{disabled: isDisabled(page, 'back')}"
            @click="changePage(page - 1)"
        >
            <a class="page-link" href="javascript:void(0)">&lsaquo;</a>
        </li>
        <li class="page-item item-previous-batch" v-if="hasPreviousBatch" @click="changePage()">
            <span class="page-link">...</span>
        </li>
        <li class="page-item item" @click="changePage(n)" v-for="n in getNumberPages" :key="n" :class="{active: page === n}">
            <a class="page-link" href="javascript:void(0)">{{ n }}</a>
        </li>
        <li class="page-item item-next-batch" v-if="hasNextBatch" @click="changePage()">
            <span class="page-link">...</span>
        </li>
        <li class="page-item item-next" :class="{disabled: isDisabled(page, 'forward')}" @click="changePage(page + 1)">
            <a class="page-link" href="javascript:void(0)">&rsaquo;</a>
        </li>
        <li class="page-item item-last" :class="{disabled: isDisabled(page, 'forward')}" @click="changePage(totalPages)">
            <a class="page-link" href="javascript:void(0)">&raquo;</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'pagination',
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
            displayPages: {
                default: 5,
            },
            showBatchButton: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            changePage(page) {
                if (page <= this.totalPages && page >= 1) {
                    this.setPage(page);
                }
            },
            isDisabled(page, attr) {
                return (page <= 1 && attr === 'back') || (page >= this.totalPages && attr === 'forward');
            },
            averageCount() {
                return Math.round((this.displayPages - 1) / 2);
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
            }
        }
    }
</script>

<style lang="scss">
    .pagination {
        margin-bottom: 0;
        .page-item {
            .page-link {
                box-shadow: none;
                color: $green;
            }
            &.active {
                .page-link {
                    background-color: $green;
                    border-color: $green;
                }
            }
        }
    }
</style>
