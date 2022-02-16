<template>
    <div class="what-is-muso d-none d-md-flex"> 
        <div class="container">
        <h2 class="floating-title">About App</h2>
        <div class="content">
            <div class="what-is-muso-text">
                <img class="album-art lazyload" data-src="images/album-art-2.jpg" />
                <h1>What is Muso.AI?</h1>
                <p>The Muso.AI app gives users ability to capture and gather credits for albums, as well as correct and edit legacy credits on their profile</p>
                <p>It's our mission to ensure that every collaborator receives the credit they deserve, wether it be on legacy tracks or new tracks going forward.</p>
            </div>
            <div class="right-image">
                <img data-src="images/what-is-muso.png" class="lazyload" />
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "WhatIsMuso"
}
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        max-width: 1140px;
        margin: 0 auto;
        padding-left: 30px;
        padding-right: 30px;
        position: relative;
    }
    .what-is-muso {
        overflow: hidden;
        position: relative;
        height: 100vh;
        max-height: 950px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 25px 0;
         @media screen and (max-width: 768px) {
             min-height: none;
         }
        & .content {
            display: flex;
            align-items: center;
            @media screen and (max-width: 768px) {
                text-align: center;
                flex-direction: column;
                justify-content: center;
                align-content: center;
            }
        }
        
    }
    .what-is-muso-text {
        flex: 1;
        position: relative;
        & h1 {
            font-weight: bold;
            font-size: 60px;
            line-height: 110%;
            margin-bottom: 30px;
            @media screen and (max-width: 768px) { 
                font-size: 40px;
            }
        }
        & p {
            margin-bottom: 30px;
            font-weight: normal;
            font-size: 16px;
            line-height: 140%;
        }
        & .album-art {
            position: absolute;
            width: 160px;
            top: -160px;
            left: 94px;
        }
    }
    .right-image {
        position: relative;
        flex: 1;
        & img {
            position: absolute;
            transform: translateY(-50%);
            @media screen and (max-width: 768px) {
                position: static;
                transform: none;
                width: 100%;
            }
        }
    }
    .floating-title {
        position: absolute;
        left: 0px;
        top: -114px;
        right: auto;
        bottom: auto;
        display: inline;
        color: #8f8f8f;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    /* For tablet screens */
    @media (min-width: 768px) and (max-width: 1279px) {
        .floating-title {
            left: 16px;
        }
        .what-is-muso-text {
            & p {
                font-weight: normal;
                font-size: 14px;
                line-height: 140%;
            }
            & .album-art {
                position: absolute;
                width: 120px;
                top: -115px;
                left: 124px;
            }
        }
    }

    /* For mobile screens */
    @media screen and (max-width: 768px) {
        .container {
            padding: 0 16px 16px 16px;
        }
        .floating-title {
            left: 16px;
        }
    }
</style>