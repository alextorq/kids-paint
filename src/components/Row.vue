<template>
    <li style="width: 100%">
        <ul class="grid__list" style="list-style: none; padding: 0;">
            <gridItem v-for="(item, index) in row"
                      :info="item"
                      :key="index + 'left'"
                      @mousemove="$emit('mousemove', $event)"
                      @click="$emit('click', $event)"
                      :width="width">
            </gridItem>
        </ul>
    </li>
</template>
<script>
    import gridItem from './grid__item';

    export default {
        name: "Row",
        components: {gridItem},
        props: {
            row: {
                type: Array,
            },
            width: {
                type: String,
            }
        },
    }
</script>
