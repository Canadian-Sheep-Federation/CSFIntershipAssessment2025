<script setup>
import { ref, watch } from "vue";

const props = defineProps(["href", "songname", "artist", "refreshKey"]);
const iframeRef = ref(null);
const videoSource = ref("");
const show = ref(false);

watch(
    () => props.href,
    async (newVal, oldVal) => {
        console.log(props.href);
        if (props.href == "undefined?&autoplay=1") {
            return (show.value = false);
        }

        show.value = true;

        setTimeout(() => {
            iframeRef.value.src = "";
            iframeRef.value.src = newVal;
        }, 100);
    },
);
</script>

<template>
    <div id="song-player">
        <iframe
            ref="iframeRef"
            :src="videoSource"
            v-if="show"
            width="300"
            height="300"
        ></iframe>
        <div>{{ props.songname || "No Song" }}</div>
        <div>{{ props.artist || "No Artist" }}</div>
    </div>
</template>
