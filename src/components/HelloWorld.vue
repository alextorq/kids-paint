<template>
  <div class="hello">
    <button class="btn save-pic" @click="savePicture">Save picture</button>
    <palette @chooseColor="selectColor" :colors="palette"></palette>

    <ul class="tabs">
      <preloader v-if="modelLoaded"></preloader>
      <li class="design-tab">
        <div class="rule vert">
          <div class="rule__item" v-for="i in model.rowsAmount"
              :class="{active: currentRuleColumn === i}"
              :width="width" :key="'ver' + i">
            {{i}}
          </div>
        </div>
        <div class="rule gor">
          <div class="rule__item" v-for="i in model.columnAmount"
               :class="{active: currentRuleRow === i}"
               :key="'gor' + i">
            {{i}}
          </div>
        </div>
        <ul class="grid__list">
          <gridItem v-for="(item, index) in model.pixels"
                    :key="index + item" :color="item" :width="width">
          </gridItem>
        </ul>
      </li>

      <li class="paint-tab">
        <div class="rule vert">
          <div class="rule__item" v-for="i in model.rowsAmount"
               :class="{active: currentRuleColumn === i}"
               :key="'ver' + i">
            {{i}}
          </div>
        </div>
        <div class="rule gor">
          <div class="rule__item" v-for="i in model.columnAmount"
               :class="{active: currentRuleRow === i}"
               :key="'gor' + i">
            {{i}}
          </div>
        </div>
        <ul class="grid__list"
            @mousedown="startPaint" @mouseup="stopPaint" @mouseleave="stopPaint">
          <gridItemActive v-for="(item, index) in paintingGrid"
                          @mousemove.native="paintGrid(index)"
                          :width="width"
                          @click.native="fillOneGrid(index)"
                          :key="index + item" :color="item">
          </gridItemActive>
        </ul>
      </li>
    </ul>
    <pagination></pagination>
  </div>
</template>

<script>
  import gridItem from './grid__item.vue'
  import gridItemActive from './grid__item_active.vue'
  import palette from './palette.vue'
  import pagination from './pagination'
  import api from '../api/index'
  import preloader from './preloader'
  import unic from '../utils/unic'

export default {
  name: 'HelloWorld',
  data() {
    return {
      allModel: [],
      model: {},
      modelLoaded: true,
      chooseColor: '#ffffff',
      paintingGrid: [],
      palette: [],
      currentItemOver: 0,
      paintStatus: false
    }
  },
  computed: {
    currentRuleRow() {
      return Math.floor(this.currentItemOver / this.model.columnAmount) + 1;
    },
    currentRuleColumn() {
      return (this.currentItemOver % this.model.columnAmount) + 1;
    },
    width() {
      return 100 / this.model.columnAmount
    }
  },
  methods: {
    selectColor(color) {
      this.chooseColor = color;
    },
    paintGrid(index) {
     this.currentItemOver = index;
     if(!this.paintStatus) {return}
      this.$set(this.paintingGrid, index, this.chooseColor);
    },
    fillOneGrid(index) {
      this.currentItemOver = index;
      this.$set(this.paintingGrid, index, this.chooseColor);
    },
    startPaint() {
      this.paintStatus = true;

    },
    stopPaint() {
      this.paintStatus = false;
    },
    savePicture() {
     let name = window.prompt('inter name picture');
      api.create({pixels: this.paintingGrid, name: name}).then(() => {
        this.$notify({
          title: 'Success',
          text: 'picture save'
        });
      })
    }
  },
  watch: {
    paintingGrid(value) {
      let status = value.toString() === this.model.pixels.toString();
      if (status) {
        this.$notify({
          title: 'Success',
          text: 'you are win'
        });
      }

    }
  },
  components: {
    gridItem,
    palette,
    gridItemActive,
    pagination,
    preloader
  },
  async created() {
    this.allModel = await api.loadAll();
    this.model = this.allModel[0];
    this.palette = unic(this.model.pixels);
    this.paintingGrid = new Array(this.model.pixels.length).fill('#ffffff');
    this.modelLoaded = false;
  }
}
</script>
