<script setup>
import { ref, watch } from "vue";
const emit = defineEmits("loadSong");
const model = defineModel();

const searchInput = ref();
const searchResults = ref([]);

async function makeSearch() {
    let search = new Request("/API/POST/SearchSongs", {
        body: JSON.stringify({
            search: searchInput.value.value,
            searchCount: 10,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });

    let output = await fetch(search)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            searchResults.value = data.data;
        });
}
</script>

<template>
    <div>
        <input ref="searchInput" />
        <button @click="makeSearch" id="search">Search</button>
    </div>
    <div id="search-results">
        <div
            class="song-result"
            v-for="result in searchResults"
            v-key="result.id"
        >
            <img :src="result.artwork" width="75" height="75" />
            <div>
                <div>{{ result.name }}</div>
                <div>{{ result.artist }}</div>
                <button @click="emit('loadSong', result.id)">Play</button>
            </div>
        </div>
    </div>
</template>
