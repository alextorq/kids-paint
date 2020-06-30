<template>
    <li
        @mouseover.passive="!leftSide ? $emit('mousemove', {index, color}) : null"
        @mousedown.passive="!leftSide ? $emit('click', {index, color}) : null"
        class="grid__item"
        :style="colorBg">
    </li>
</template>

<script>
    export default {
        name: "grid__item",
        computed: {
          colorBg() {
              return {
                  backgroundColor: this.color,
                  width: this.width,
                  paddingBottom: this.width,
              }
          }
        },
        props: {
            color: {
                type: String,
                default: '#ffffff',
            },
            width: {
                type: String
            },
            index: {
              type: Number,
              required: true
            },
            leftSide: {
                type: Boolean,
                default: false,
            }
        },
    }
</script>
