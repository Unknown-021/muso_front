<template>
    <div class="wrapper">
        <div class="arrows">
            <span @click="sortClass('asc')" class="flex-cell sort fa fa-sort-asc"></span>
            <span @click="sortClass('desc')" class="flex-cell sort fa fa-sort-desc"></span>
        </div>
        <div class="title">{{ title }}</div>
    </div>
</template>

<script>
    export default {
        name: 'sortColumn',
        props: {
            title: {
                type: String,
                required: true,
            },
            field: {
                type: String,
                required: true,
            },
            filter: {
                type: Object,
                required: true,
            },
        },
        methods: {
            sortClass(type) {
                let classes = [];
                let sortField = this.filter.getAttribute('sortField');
                let sortType = this.filter.getAttribute('sortType');

                this.filter.setAttribute('sortField', this.field);
                this.filter.setAttribute('sortType', type);
            },
        },
    };
</script>

<style lang="scss">
.wrapper {
    display: inline-flex;
}

.arrows {
    display: flex;
    flex-direction: column;
    line-height: 1;
}

.title {
    display: flex;
    align-self: center;
}
</style>
