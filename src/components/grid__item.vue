<template>
    <li
        @mouseover.passive="$emit('mousemove', info)"
        @mousedown.passive="$emit('click', info)"
        class="grid__item"
        :class="classes"
        :style="colorBg">
        <span class="top_bottom"></span>
        <span class="left_right">
        </span>
    </li>
</template>

<script>
    export default {
        name: "grid__item",
        computed: {
            classes() {
                if (this.hideGuides) {
                    return {}
                }
                const row = this.currentRow - 1
                const col = this.currentColumn - 1
                return {
                    row: this.info.row === row && col >= this.info.col,
                    col: this.info.col === col && row >= this.info.row,
                    current: this.info.row === row && col === this.info.col
                }
            },
          colorBg() {
              return {
                  backgroundColor: this.info.color,
                  width: this.width,
                  paddingBottom: this.width,
              }
          }
        },
        props: {
            info: {
                type: Object,
                required: true
            },
            width: {
                type: String
            },
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
            }
        },
    }
</script>
