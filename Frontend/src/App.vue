<script setup>
import { ref, onMounted } from "vue";
import SongPlayer from "./components/SongPlayer.vue";
import SongSearch from "./components/SongSearch.vue";
import SongLyrics from "./components/SongLyrics.vue";

const tabId = ref(0);

function setTab(id) {
    tabId.value = id;
}

const SongName = ref("None");
const SongArtist = ref("None");
const SongVideo = ref();
const SongLyricsRef = ref("No Lyrics Available");

async function LoadSong(id) {
    let song = new Request("/API/GET/GetSong/" + id);

    if (id === undefined) song = new Request("/API/GET/GetLastSong");

    await fetch(song)
        .then((response) => response.json())
        .then((data) => {
            SongName.value = data.data.name;
            SongArtist.value = data.data.artist;
            SongVideo.value = data.data.youtube + "?&autoplay=1";
            SongLyricsRef.value = data.data.lyrics;
            tabId.value = 1;
        });
}

onMounted(() => LoadSong(undefined));
</script>

<template>
    <div id="content-split">
        <div>
            <div class="options">
                <button @click="setTab(0)">Find a Song</button>
                <button @click="setTab(1)">View Song Lyrics</button>
            </div>
            <div class="container">
                <template v-if="tabId == 0">
                    <SongSearch @LoadSong="LoadSong" />
                </template>
                <template v-else>
                    <SongLyrics :lyrics="SongLyricsRef" />
                </template>
            </div>
        </div>
        <SongPlayer
            :href="SongVideo"
            :songname="SongName"
            :artist="SongArtist"
        />
    </div>
</template>

<style scoped>
#content-split {
    display: grid;
    grid-template-columns: auto 350px;
}
</style>
