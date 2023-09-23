<script lang="ts">
    import { fade } from 'svelte/transition';

    export let showModal = false;
    export let close: () => void;
    if (showModal) {
        console.log("wow");
    };

</script>
{#if showModal}
    <div transition:fade class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg shadow-md">
            <h2 class="text-2xl mb-4">PaceQuick - A Simple Running Tool</h2>
            <p> </p>
            <button on:click={close} class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded">Close</button>
        </div>
  </div>
{/if}

<style>
    
</style>