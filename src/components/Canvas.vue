<template>
  <div class="hello">
    <button class="btn save-pic" @click="savePicture">Save picture</button>
      <button class="toggle__view" @click="recalculate">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <path d="M351.68,53.653c69.653,33.067,119.68,100.8,127.253,181.013h32C500.053,103.253,390.187,0,256,0
                c-4.8,0-9.387,0.427-14.187,0.747L323.2,82.133C323.2,82.133,351.68,53.653,351.68,53.653z M218.24,37.227
                c-12.48-12.48-32.747-12.48-45.227,0L37.227,173.013c-12.48,12.48-12.48,32.747,0,45.227l256.427,256.427
                c12.48,12.48,32.747,12.48,45.227,0L474.667,338.88c12.48-12.48,12.48-32.747,0-45.227L218.24,37.227z M316.373,452.053
                L59.84,195.627L195.627,59.84l256.427,256.427L316.373,452.053z M160.32,458.347C90.667,425.28,40.64,357.547,33.067,277.333h-32
                C11.947,408.747,121.813,512,256,512c4.8,0,9.387-0.427,14.187-0.747L188.8,429.867L160.32,458.347L160.32,458.347z">

            </path>
            </svg>
      </button>
    <palette @chooseColor="selectColor" :colors="palette" @addNewColor="addNewColor"></palette>

    <label>
      <input type="checkbox" v-model="hideGuides">
      Hide Guides
    </label>

    <ul class="tabs">
      <preloader v-if="modelLoaded"></preloader>
      <li class="design-tab" :style="{paddingLeft: widthInPixels, paddingTop: widthInPixels, width: gridWidthMode}">
        <div class="rule vert" :style="{paddingLeft: widthInPixels, height: widthInPixels}">
          <div
              class="rule__item"
              v-for="i in model.columnAmount"
              :class="{active: currentRuleColumn === i && !hideGuides}"
              :style="{width: width}"
              :key="'ver' + i">
              <span>{{i}}</span>
          </div>
        </div>
        <div class="rule gor" :style="{width: widthInPixels, paddingTop: widthInPixels}">
          <div
               class="rule__item"
               v-for="i in model.rowsAmount"
               :class="{active: currentRuleRow === i && !hideGuides}"
               :key="'gor' + i"
               :style="{height: widthInPixels}">
              <span>{{i}}</span>
          </div>
        </div>
        <ul class="grid__list" ref="gridList">
          <gridItem v-for="(item, index) in referencePicture"
                    :info="item"
                    :key="index + 'left'"
                    :currentRow="currentRuleRow"
                    :hideGuides="hideGuides"
                    :currentColumn="currentRuleColumn"
                    :width="width">
          </gridItem>
        </ul>
      </li>

      <li class="paint-tab"
          :style="{paddingLeft: widthInPixels, paddingTop: widthInPixels, width: gridWidthMode}">
        <div class="rule vert"
             :style="{paddingLeft: widthInPixels, height: widthInPixels}">
          <div
            class="rule__item"
            v-for="i in model.columnAmount"
            :class="{active: currentRuleColumn === i && !hideGuides}"
            :style="{width: width}"
            :key="'ver' + i">
            <span>{{i}}</span>
          </div>
        </div>
        <div class="rule gor"
             :style="{paddingTop: widthInPixels, width: widthInPixels}">
          <div class="rule__item"
            v-for="i in model.rowsAmount"
            :class="{active: currentRuleRow === i && !hideGuides}"
            :style="{height: widthInPixels}"
            :key="'gor' + i">
            <span>{{i}}</span>
          </div>
        </div>
        <ul class="grid__list"
            @mousedown.passive="startPaint"
            @mouseup.passive="stopPaint"
            @mouseleave.passive="stopPaint">
          <gridItem
            class="border"
            v-for="(item, index) in userPicture"
            @mousemove="paintGrid"
            @click="paint"
            :width="width"
            :hideGuides="hideGuides"
            :currentRow="currentRuleRow"
            :currentColumn="currentRuleColumn"
            :index="index"
            :key="index"
            :info="item">
          </gridItem>
        </ul>
      </li>
    </ul>
    <pagination
      @next="nextPicture"
      @prev="prevPicture">
    </pagination>
  </div>
</template>

<script>
import gridItem from './grid__item.vue'
import palette from './palette.vue'
import pagination from './pagination'
import api from '../api/index'
import preloader from './preloader'
import History from "../utils/History";
import items from "../utils/Matrix";

export default {
  name: 'Canvas',
  data() {
    return {
      hideGuides: false,
      allModel: [],
      model: {},
      modelLoaded: true,
      chooseColor: '#ffffff',
      userPicture: [],
      referencePicture: [],
      palette: [],
      currentItemOver: {},
      gridWidth: 0,
      paintStatus: false,
      currentModel: 0,
      horizonMode: true
    }
  },
  computed: {
    widthInPixels() {
      return (this.gridWidth / (this.model.columnAmount + 1)) + 'px';
    },
    currentRuleRow() {
      return this.currentItemOver.row + 1;
    },
    currentRuleColumn() {
      return this.currentItemOver.col + 1;
    },
    width() {
      return 100 / this.model.columnAmount + '%';
    },
    gridWidthMode() {
        return this.horizonMode ? '50%' : '100%';
    }
  },
  methods: {
    selectColor(color) {
      this.chooseColor = color;
    },
    paintGrid(item) {
      this.currentItemOver = item;
      if(!this.paintStatus) {return}
      this.paint(item);
    },
    restoreFromHistory() {
      const steps = History.restoreStep();
      if (steps) {
        steps.forEach((item) => {
          const index = this.userPicture.findIndex(one => one.index === item.index)
          this.userPicture.splice(index, 1, item);
        })
      }
    },
    paint(item) {
      History.addToBuffer(JSON.parse(JSON.stringify(item)));
      this.currentItemOver = item;
      item.color = this.chooseColor;
    },
    startPaint() {
      this.paintStatus = true;
    },
    addNewColor(color) {
      this.palette.push(color)
    },
    stopPaint() {
      this.paintStatus = false;
      History.addToHistory();
    },
    recalculate(event, clear = false) {
      if(!clear) {
        this.horizonMode = !this.horizonMode;
      }
      this.gridWidth = 0;
      this.$nextTick().then(() => {
        this.gridWidth = this.$refs.gridList.scrollWidth;
      });
    },
    setPicture(number) {
      this.model = this.allModel[number];
      this.palette = this.model.colors;

      const referencePicture = items(this.model.pixels, this.model.rowsAmount, this.model.columnAmount)
      const userPicture =  items(new Array(this.model.pixels.length).fill('#ffffff'), this.model.rowsAmount, this.model.columnAmount)
      this.userPicture = userPicture;
      this.referencePicture = referencePicture;

      History.clear();
    },
    nextPicture() {
      const nextPicture = (this.currentModel + 1) % this.allModel.length;
      this.setPicture(nextPicture);
      this.currentModel = nextPicture;
    },
    prevPicture() {
      const prev = (this.currentModel > 0) ? (this.currentModel - 1) : (this.allModel.length - 1);
      this.setPicture(prev);
      this.currentModel = prev;
    },
    async savePicture() {
      try {
        let name = window.prompt('inter name picture');
        await api.create({
          pixels: this.paintingGrid,
          name: name,
          colors: this.palette,
          columnAmount: this.model.columnAmount,
          rowsAmount: this.model.rowsAmount
        });
        this.$notify({
          title: 'Success',
          text: 'picture save'
        });
      }catch (e) {
        this.$notify({
          title: 'Error',
          text: 'Something was wrong'
        });
      }
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
        this.nextPicture();
      }
    }
  },
  components: {
    gridItem,
    palette,
    pagination,
    preloader
  },
  mounted() {
    this.gridWidth = this.$refs.gridList.scrollWidth;
    window.onresize = () => {
      this.recalculate(null, true);
    };

    document.addEventListener('keydown', event => {
      if (event.ctrlKey && event.code === 'KeyZ') {
        this.restoreFromHistory()
      }
    })
  },
  async created() {
    const {data} = await api.loadAll();
    this.allModel = data;
    this.setPicture(0);
    this.modelLoaded = false;
  }
}
</script>
