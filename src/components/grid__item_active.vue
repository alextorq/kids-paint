<template>
    <li class="grid__item border" :style="colorBg"></li>
</template>

<script>
    export default {
        name: "grid__item",
        computed: {
          colorBg() {
              return {
                  backgroundColor: this.color
              }
          }
        },
        props: ['color']
    }
</script>
