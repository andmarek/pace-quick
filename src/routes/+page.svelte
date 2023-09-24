<script lang='ts'>
    import { text } from '@sveltejs/kit';
    import Modal from '../components/AboutModal.svelte';

    /* Constants */
    const MILES_TO_KM = 1.60934; // conversion factor
    const commonDistancesMiles = [1, 5, 10, 13.1, 26.2]
    const commonDistancesKm = [1, 5, 10];

    let showModal = false;
    let textDistance = 0; // Set initial value to avoid division by zero
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    /**
     * @type {string}
     */
    let formattedPace;
    /**
     * @type {string} */
    let paceKm;
    /**
     * @type {string}
     */
    let pace;
    let unit = 'miles'; // default unit
    let textUnit = 'mi';
    let selectedDistance: number | string = "";

    /* Handlers */
    const handleUnitChange = (event) => {
        unit = event.target.value;
        textUnit = unit === 'miles' ? 'mi' : 'km';

        /* Handle if the unit changes and the user already
            has entered a distance */
        if (textDistance > 0) {
            if (unit == "miles") {
                textDistance = (textDistance / MILES_TO_KM);
            } else {
                textDistance = textDistance * MILES_TO_KM;
            }
        }
        // Reset the selected distance when unit changes
        selectedDistance = '';   
    };

    const handleDistanceSelect = () => {
        if (selectedDistance) {
            textDistance = parseFloat(selectedDistance);
        }
    };


    $: {
        if (textDistance > 0) {
            const totalMinutes = (hours * 60) + minutes + (seconds / 60);
            const distance = textDistance;
            let paceMinutes = 0;
            if (textUnit == "mi") {
                paceMinutes = totalMinutes / textDistance;
            } else if (textUnit == "km") {
                let distanceKm = distance * MILES_TO_KM;
                paceMinutes = totalMinutes / distanceKm;
            }

            // Format the pace
            const mins = Math.floor(paceMinutes);
            const secs = Math.round((paceMinutes - mins) * 60 * 10) / 10; // one decimal place
            formattedPace = `${mins.toString().padStart(2, '0')}:${secs.toFixed(1).padStart(4, '0')}`;

        } else {
            formattedPace = "Please enter a distance greater than zero";
        }
    }
</script>

<body class="flex flex-col bg-zinc-50 w-full">
    <nav class="bg-gray-100 p-4 shadow-md w-full">
        <div class="container mx-auto flex justify-between items-center">
          <a href="/" class="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">
            PaceQuick
          </a>
          <div class="space-x-4">
            <a href="https://andmarek.com" class="text-lg text-gray-800 hover:text-gray-600 hover:underline transition duration-300">
              andmarek
            </a>
            <button 
              class="text-lg text-gray-800 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 focus:outline-none transition duration-300"
              on:click={() => showModal = true}>
              About
            </button>
          </div>
        </div>
      </nav>
      
      
      <div class="flex-1 flex items-center justify-center">

    <div class="flex flex-col p-6 overflow-y-auto">  
        <div class="flex items-center space-x-4 py-4">
            <label>
                <input type="radio" value="miles" bind:group={unit} on:change={handleUnitChange} />
                Miles
            </label>
            <label>
                <input type="radio" value="km" bind:group={unit} on:change={handleUnitChange} />
                Kilometers
            </label>

          <select bind:value={selectedDistance} on:change={handleDistanceSelect} class="mt-1 p-2 w-48 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="" disabled>Common Distances</option>
                {#each unit === 'miles' ? commonDistancesMiles : commonDistancesKm as distance}
                    <option value={distance}>{distance} {textUnit}</option>
                {/each}
            </select>
        </div>

        <div id="input" class="flex flex-col space-y-4">
            <label class="block w-96 text-sm font-medium text-gray-700" for="distance">
                Distance 
                <span class="inline-block w-8 text-center">({textUnit})</span>:
                <input 
                    id="distance"
                    class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-100 ease-in-out focus:bg-gray-100"
                    type="number"
                    bind:value={textDistance}
                    step="0.01"
                    />
            </label>
            <label class="w-96 block text-sm font-medium text-gray-700" for="hours">
                Hours:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-100 ease-in-out focus:bg-gray-100" type="number" bind:value={hours} />
            </label>

            <label class="w-96 block text-sm font-medium text-gray-700">
                Minutes:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-100 ease-in-out focus:bg-gray-100" type="number" bind:value={minutes} />
            </label>

            <label class="w-96 block text-sm font-medium text-gray-700">
                Seconds:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-100 ease-in-out focus:bg-gray-100" type="number" bind:value={seconds} />
            </label>
        </div>

        <div id="output" class="w-96 flex flex-col mt-6">
            <p class="block text-sm font-medium text-gray-700">Your pace (minutes per {textUnit}):</p>
            <p class="text-lg"> {formattedPace} </p>
        </div>
    </div>
</div>
    <Modal {showModal} close={() => showModal = false} />
</body>