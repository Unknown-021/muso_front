<template>
    <div>
        <skeleton class="long mt-25 mb-25" />
        <div class="flex-column mr-15" v-for="index in 1" :key="`aalbums-body${index}`">
            <skeleton class="img mb-10" />
            <skeleton class="o8 mb-10" />
            <skeleton class="long o8" />
        </div>
        <hr class="hr" />
        <skeleton class="long mt-15 mb-15" />
        <!-- desktop view  -->
        <div class="d-none d-md-block">
            <div class="tracks">
                <div class="d-none d-md-flex mb-15 track" v-for="index in 6" :key="`pcollaborators-m-${index}`">
                    <skeleton class="avatar rounded mr-15" />
                    <div class="col d-flex flex-column justify-content-center mr-15">
                        <skeleton class="short thin o6 mb-5" />
                        <skeleton class="long thin o6" />
                    </div>
                </div>
            </div>
            <hr class="hr" />
            <skeleton class="long mt-15 mb-15" />
            <div class="albums d-flex">
                <div class="d-none d-md-flex flex-column mr-15" v-for="index in 7" v-bind:style="{ opacity: 1.0 / index }" :key="`aalbums-body${index}`">
                    <skeleton class="img round mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
            <hr class="hr" />
            <skeleton class="long mt-15 mb-15" />
            <div class="albums d-flex">
                <div class="d-none d-md-flex flex-column mr-15" v-for="index in 7" v-bind:style="{ opacity: 1.0 / index }" :key="`aalbums-body${index}`">
                    <skeleton class="img mb-10" />
                    <skeleton class="o8 mb-10" />
                    <skeleton class="long o8" />
                </div>
            </div>
        </div>
        <!-- mobile view -->
        <div class="d-flex d-md-none mb-15" v-for="index in 3" :key="`pcollaborators-m-${index}`">
            <skeleton class="avatar rounded mr-15" />
            <div class="col d-flex flex-column justify-content-center mr-15">
            <skeleton class="short thin o6 mb-5" />
            <skeleton class="long thin o6" />
            </div>
        </div>
        <div class="d-flex d-md-none mb-15" style="opacity: .75;">
            <skeleton class="avatar rounded mr-15" />
            <div class="col d-flex flex-column justify-content-center mr-15">
            <skeleton class="short thin o6 mb-5" />
            <skeleton class="long thin o6" />
            </div>
        </div>
        <div class="d-flex d-md-none mb-15" style="opacity: .5;">
            <skeleton class="avatar rounded mr-15" />
            <div class="col d-flex flex-column justify-content-center mr-15">
            <skeleton class="short thin o6 mb-5" />
            <skeleton class="long thin o6" />
            </div>
        </div>
        <div class="d-flex d-md-none mb-15" style="opacity: .25;">
            <skeleton class="avatar rounded mr-15" />
            <div class="col d-flex flex-column justify-content-center mr-15">
            <skeleton class="short thin o6 mb-5" />
            <skeleton class="long thin o6" />
            </div>
        </div>
        <div class="d-flex d-md-none mb-15" style="opacity: .1;">
            <skeleton class="avatar rounded mr-15" />
            <div class="col d-flex flex-column justify-content-center mr-15">
            <skeleton class="short thin o6 mb-5" />
            <skeleton class="long thin o6" />
            </div>
        </div>
    </div>
</template>

<script>
import Skeleton from "components/ui/skeleton";

export default {
    name: "SearchSkeleton",
    components: {
        Skeleton,
    },
};
</script>

<style lang="sass" scoped>
    .hr {
        margin: 25px 0;
        border: 1px solid #21201f;
    }
    .tracks {
        display: flex;
        flex-wrap: wrap;
        .track {
            flex: 1 0 33%;
        }
    }
    .albums {
        overflow: hidden;
    }
    .round {
        border-radius: 50%;
    }
</style>