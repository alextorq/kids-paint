<template>
    <li class="grid__item" :style="colorBg"></li>
</template>

<script>
    export default {
        name: "grid__item",
        computed: {
          colorBg() {
              return {
                  backgroundColor: this.color,
                  width: this.width + '%',
                  paddingBottom: this.width + '%',
              }
          }
        },
        props: ['color', 'width']
    }
</script>
