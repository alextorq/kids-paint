<template>
    <div>
        <div class="rule vert" :style="{paddingLeft: widthInPixels, height: widthInPixels}">
            <div
                    class="rule__item"
                    v-for="i in columns"
                    :class="{active: currentRuleColumn === i}"
                    :style="{width: width}"
                    :key="'ver' + i">
                <span>{{i}}</span>
            </div>
        </div>
        <div class="rule gor" :style="{width: widthInPixels, paddingTop: widthInPixels}">
            <div
                    class="rule__item"
                    v-for="i in rows"
                    :class="{active: currentRuleRow === i}"
                    :key="'gor' + i"
                    :style="{height: widthInPixels}">
                <span>{{i}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Guides",
        props: {
            width: {
                type: String
            },
            rows: {
                type: Number
            },
            columns: {
                type: Number,
            },
            widthInPixels: {
              type: String,
            },
            currentRuleRow: {
                type: Number
            },
            currentRuleColumn: {
                type: Number
            }
        }
    }
</script>
