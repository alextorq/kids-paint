<template>
    <div class="palette-wrapper">
        <div class="text-center text-bold title">
            choose color
        </div>
        <div class="palette__list">
            <div class="palette__item" v-for="(color, index) in colors"
                 @click="chooseColor(color)"
                 :key="index + color" :style="{backgroundColor: color}">
            </div>
            <div class="add__color">
                <button class="add__color-btn">
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#E5E5E5;" d="M467,195v52.2l-19.799,62.4L422,334.499L402.499,354c-0.298,0.3-0.599,0.601-0.899,0.601L377,337.2
	V195c0-8.401,6.599-15,15-15h60C460.401,180,467,186.599,467,195z"/>
                        <path style="fill:#C8C6CD;" d="M467,195v52.2l-19.799,62.4L422,334.499V180h30C460.401,180,467,186.599,467,195z"/>
                        <path style="fill:#17ACE8;" d="M377,337.2V437c0,2.399,0.601,4.499,1.5,6.599l30,60C411.2,508.7,416.3,512,422,512
	s10.8-3.3,13.5-8.401l30-60c0.899-2.1,1.5-4.2,1.5-6.599V247.2L377,337.2z"/>
                        <path style="fill:#1689FC;" d="M422,292.2l45-45V437c0,2.399-0.601,4.499-1.5,6.599l-30,60C432.8,508.7,427.7,512,422,512V292.2z"/>
                        <g>
	<path style="fill:#E5E5E5;" d="M293.101,243.599c-2.1,1.8-19.2,15.601-36.301,29.401H57.001L6.899,243.599
		C10.201,233.7,14.7,224.4,20.7,216.3L62.999,159c2.701-3.9,7.202-6,12.001-6h150c4.799,0,9.3,2.1,12.001,6l42.299,56.999
		C285.3,224.4,289.799,233.7,293.101,243.599z"/>
                            <path style="fill:#E5E5E5;" d="M300,425v41.999c0,12.301-5.099,23.701-13.2,31.8c-8.101,8.101-19.501,13.2-31.8,13.2H45
		c-12.299,0-23.699-5.099-31.8-13.2C5.099,490.7,0,479.3,0,466.999V425l25.8-15l25.501-15h202.5l23.099,15L300,425z"/>
</g>
                        <g>
	<path style="fill:#C8C6CD;" d="M256.8,273H150V153h75c4.799,0,9.3,2.1,12.001,6l42.299,56.999c6,8.401,10.499,17.701,13.801,27.599
		C291,245.399,273.9,259.199,256.8,273z"/>
                            <path style="fill:#C8C6CD;" d="M300,425v41.999c0,12.301-5.099,23.701-13.2,31.8c-8.101,8.101-19.501,13.2-31.8,13.2H150V395
		h103.801l23.099,15L300,425z"/>
</g>
                        <path style="fill:#787780;" d="M225,93H75c-24.901,0-45,20.099-45,45c0,24.899,20.099,45,45,45h150c24.901,0,45-20.101,45-45
	C270,113.099,249.901,93,225,93z"/>
                        <path style="fill:#57555C;" d="M225,183h-75V93h75c24.901,0,45,20.099,45,45C270,162.899,249.901,183,225,183z"/>
                        <path style="fill:#17ACE8;" d="M296.7,254.1L294,243H6l-2.7,11.1C1.2,262.499,0,270.6,0,278.7V425h300V278.7
	C300,270.599,298.801,262.499,296.7,254.1z"/>
                        <path style="fill:#1689FC;" d="M300,278.7V425H150V243h144l2.701,11.1C298.801,262.499,300,270.599,300,278.7z"/>
                        <path style="fill:#57555C;" d="M422,0c-24.901,0-45,20.099-45,45v90c0,8.399,6.599,15,15,15h60c8.401,0,15-6.601,15-15V45
	C467,20.099,446.901,0,422,0z"/>
                        <path style="fill:#3C3A41;" d="M467,45v90c0,8.399-6.599,15-15,15h-30V0C446.901,0,467,20.099,467,45z"/>
                        <path style="fill:#787780;" d="M512,165c0-24.901-20.099-45-45-45h-90c-24.901,0-45,20.099-45,45v30c0,8.399,6.599,15,15,15h150
	c8.401,0,15-6.601,15-15V165z"/>
                        <path style="fill:#57555C;" d="M467,120c24.901,0,45,20.099,45,45v30c0,8.399-6.599,15-15,15h-75v-90H467z"/>
</svg>

                </button>
                <input type="color" @change="addNewColor" v-model="additionalColor">
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
          return {
              additionalColor: '#ff0000'
          }
        },
        name: "palette",
        methods: {
            chooseColor(color) {
                this.$emit('chooseColor', color)
            },
            addNewColor() {
                this.$emit('addNewColor', this.additionalColor);
            }
        },
        props: ['colors']
    }
</script>
