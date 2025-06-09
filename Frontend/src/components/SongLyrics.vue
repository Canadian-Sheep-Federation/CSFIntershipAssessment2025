<script setup>
import { watch, ref } from "vue";
import showdown from "showdown";

let props = defineProps(["lyrics"]);
let lyricsRef = ref("No Lyrics Found");

let converter = new showdown.Converter();

watch(
    () => props.lyrics,
    (newVal, oldVal) => {
        lyricsRef.value = converter.makeHtml(props.lyrics);
    },
    { immediate: true },
);
</script>

<template>
    <div v-html="lyricsRef"></div>
</template>
