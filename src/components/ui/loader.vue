<template>
    <div class="loader">
        <div class="loader-inner line-scale-pulse-out">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="message" v-if="message">{{ message }}</div>
    </div>
</template>

<script>
    export default {
        name: 'loader',
        props: {
            message: {
                type: String,
            },
        },
    };
</script>

<style lang="scss">
    @-webkit-keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }

    @keyframes line-scale-pulse-out {
        0% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
        50% {
            -webkit-transform: scaley(0.4);
            transform: scaley(0.4);
        }
        100% {
            -webkit-transform: scaley(1);
            transform: scaley(1);
        }
    }

    .loader {
        display: flex;
        flex-direction: column;
        align-items: center;

        .loader-inner {
            align-self: center;
        }
    }

    .line-scale-pulse-out {
        & > div {
            background-color: #03C9A9;
            width: 4px;
            height: 35px;
            border-radius: 2px;
            animation-fill-mode: both;
            display: inline-block;
            animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);

            &:nth-child(1), &:nth-child(5) {
                -webkit-animation-delay: -0.2s !important;
                animation-delay: -0.2s !important;
            }

            &:nth-child(2), &:nth-child(4) {
                -webkit-animation-delay: -0.4s !important;
                animation-delay: -0.4s !important;
            }
        }
    }
</style>
