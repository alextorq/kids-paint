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
                return {
                    row: this.info.row === (this.currentRow - 1) && (this.currentColumn - 1) >= this.info.col,
                    col: this.info.col === (this.currentColumn - 1) && (this.currentRow - 1) >= this.info.row,
                    current: this.info.row === (this.currentRow - 1) && (this.currentColumn - 1) === this.info.col
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
            }
        },
    }
</script>
