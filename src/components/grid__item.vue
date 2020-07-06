<template>
    <li
        @mouseover.passive="$emit('mousemove', info)"
        @mousedown.passive="$emit('click', info)"
        class="grid__item"
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
        },
    }
</script>
