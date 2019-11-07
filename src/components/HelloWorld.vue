<template>
  <div class="hello">
    <button class="btn save-pic" @click="savePicture">Save picture</button>
    <palette @chooseColor="selectColor" :colors="palette"></palette>

    <ul class="tabs">
      <li class="design-tab">
        <div class="rule vert">
          <div class="rule__item" v-for="i in 25" :key="'ver' + i">
            {{i}}
          </div>
        </div>
        <div class="rule gor">
          <div class="rule__item" v-for="i in 21" :key="'gor' + i">
            {{i}}
          </div>
        </div>
        required
        <ul class="grid__list">
          <gridItem v-for="(item, index) in model.pixels" :key="index + item" :color="item"></gridItem>
        </ul>
      </li>

      <li class="paint-tab">
        you do
        <div class="rule vert">
          <div class="rule__item" v-for="i in 25" :key="'ver' + i">
            {{i}}
          </div>
        </div>
        <div class="rule gor">
          <div class="rule__item" v-for="i in 21" :key="'gor' + i">
            {{i}}
          </div>
        </div>
        <ul class="grid__list"
            @mousedown="startPaint" @mouseup="stopPaint" @mouseleave="stopPaint">
          <gridItemActive v-for="(item, index) in paintingGrid"
                          @mousemove.native="paintGrid(index)"
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
  import unic from '../utils/unic'

export default {
  name: 'HelloWorld',
  data() {
    return {
      allModel: [],
      model: {},
      chooseColor: '#ffffff',
      paintingGrid: [],
      palette: [],
      paintStatus: false
    }
  },
  methods: {
    selectColor(color) {
      this.chooseColor = color;
    },
    paintGrid(index) {
     if(!this.paintStatus) {return}

      this.$set(this.paintingGrid, index, this.chooseColor);
    },
    fillOneGrid(index) {
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
      api.create({pixels: this.paintingGrid, name: name})
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
    pagination
  },
  async created() {
    this.allModel = await api.loadAll();
    this.model = this.allModel[0];
    this.palette = unic(this.model.pixels);
    this.paintingGrid = new Array(this.model.pixels.length).fill('#ffffff');
  }
}
</script>
