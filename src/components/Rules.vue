<template>
    <div class="rules">
        <div class="vertical" :style="{height, left, width: widthInPixels}"></div>
        <div class="gorizont" :style="{'width': widthIn, paddingBottom: width + '%', top: top}"></div>
    </div>
</template>

<script>
    export default {
        name: "Rules",
        computed: {
            widthIn() {
                return `${this.currentColumn * this.width}%`
            },
            top() {
              return parseFloat(this.widthInPixels) * (this.currentRow - 1) + 'px'
            },
            height() {
                return parseFloat(this.widthInPixels) * this.currentRow + 'px';
            },
            left() {
                return `${(this.currentColumn - 1) * this.width}%`
            },
        },
        props: {
            currentRow: {
                type: Number,
                default: 1,
            },
            currentColumn: {
                type: Number,
                default: 1,
            },
            hideGuides: {
                type: Boolean,
                default: false,
            },
            width: {
                type: Number,
            },
            widthInPixels: {
                type: String,
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rules {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        pointer-events: none;
        touch-action: none;
        div {
            position: absolute;
            z-index: 15;
            will-change: width;
            &:after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                content: '';
                border: 1px solid red;
            }
        }
        .vertical {
            top: 0;
            &:after {
                border-top-color: transparent !important;
            }
        }
        .gorizont {
            left: 0;
            &:after {
                border-left-color: transparent !important;
            }
        }
    }
</style>