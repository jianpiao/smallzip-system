<template>
    <div class="music-play" :style="{display:showMusicPlay}">
        <div class="play">
            <div @click="close" class="close">关闭</div>
            <div @click="hide" class="close">隐藏</div>
            <audio controls="controls" :src="playurl" autoplay="autoplay"></audio>
        </div>
    </div>
</template>

<script>
export default {
    props:['playurl'],
    computed: {
        showMusicPlay() {
            return this.$store.getters.showMusicPlay
        }
    },
    methods: {
        close() {
            this.$store.dispatch('showMusicPlay','none')
        },
        hide() {
            // this.$store.dispatch('showMusicPlay','none')
        }
    }
}
</script>

<style scoped>
.music-play {
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000000;
}

.play {
    width: 100%;
    display: flex;
}

.close {
    padding: 0 20px;
    line-height: 32px;
    text-align: center;
    background-color: #fff;
}

.music-play audio {
    flex: 1;
    width: 100%;
}
</style>

