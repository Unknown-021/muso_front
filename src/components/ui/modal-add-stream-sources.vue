<template>
    <modal v-model="modalShown" class="modal-add-stream-sources">
        <div slot="modal-title">{{ item ? `Add source for: ${item.title}` : null }}</div>
        <div slot="modal-body" class="modal-body">
            <form class="form-streams" @submit.prevent="submit" autocomplete="off" novalidate>
                <fieldset :disabled="form.isProcessing()">
                    <div class="panel-body">
                        <div v-for="(source, index) in sources" :key="source.id">
                            <input class="form-control" v-model="source.url">
                            <button
                                type="button"
                                class="btn btn-danger"
                                @click="deleteSource(index)"
                            >delete</button>
                        </div>
                        <button type="button" class="btn btn-success" @click="addSource">New Source</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <fieldset :disabled="form.isProcessing()">
                <button type="submit" class="btn btn-primary" @click.prevent="submit">{{ 'Submit' }}</button>
                <button class="btn btn-light" @click.prevent="setValue(false)">{{ 'Close' }}</button>
            </fieldset>
        </div>
    </modal>
</template>

<script>
    import Form from 'services/form';
    import Modal from 'components/ui/modal';
    import SongModel from 'models/song';

    export default {
        name: 'modalAddStreamSources',
        props: {
            value: {},
            item: {
                type: Object,
            },
        },
        components: {
            Modal,
        },
        computed: {
            modalShown: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                },
            },
        },
        data() {
            return {
                form: new Form({}),
                sources: [],
            };
        },
        watch: {
            item: function(newItem, oldItem) {
                if (newItem) {
                    SongModel.getSources({ songId: newItem.id }).then(response => {
                        this.sources = response.data.sources;
                    }).catch(e => {
                        this.$notify(this.$t('errors.unavailable_service'), 'error');
                    });
                }
            },
        },
        methods: {
            addSource: function() {
                this.sources.push({ url: '' });
            },
            close() {
                this.modalShown = false;
            },
            setValue(value) {
                this.$emit('input', value);
                this.sources = [];
            },
            deleteSource: function(index) {
                this.sources.splice(index, 1);
            },
            submit() {
                this.form.setProcessing(true);
                return SongModel.createSources(Object.assign({}, { sources: this.sources }, { songId: this.item.id })).then(response => {
                    this.form.clearErrors();
                    if (response.errors) {
                        this.form.setErrors(response.errors);
                    }
                    if (response.result === 'ok') {
                        this.form.clearAttributes();
                        this.$notify('Stream sources were updated successfully', 'success');
                        this.setValue(false);
                        this.form = new Form({});
                        this.close();
                    }
                    if (response.message) {
                        this.$notify(response.message, 'warning');
                    }
                }).catch(() => {
                    this.$notify(this.$t('errors.unavailable_service'), 'error');
                }).finally(() => {
                    this.form.setProcessing(false);
                });
            },
        },
    };
</script>

<style lang="scss">
.modal-add-stream-sources {
    .alert {
        text-align: center;
    }
}
</style>
