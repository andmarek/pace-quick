<script>
  import { text } from '@sveltejs/kit';
    import Modal from '../components/AboutModal.svelte';

    /* Constants */
    const MILES_TO_KM = 1.60934; // conversion factor

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
        
    };
    // computed


    $: {
    console.log("calculating pace")
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

<body class="flex bg-zinc-50 items-center justify-center min-h-screen">
    <div class="flex flex-col w-96  bg-white p-6 rounded-lg shadow-md overflow-y-auto">  
        <nav class="flex gap-6 mb-6 justify-between">
            <h1 class="text-lg font-semibold hover:text-indigo-500 cursor-pointer"><a href="https://andmarek.com">andmarek</a></h1>
            <h1 class="text-lg font-semibold">Pace Calculator</h1>
            <button 
        class="basis-1/2 text-left bg-transparent border-none cursor-pointer p-0 focus:outline-none"
        on:click={() => showModal = true}
    >
        About
    </button>
        </nav>
        <label>
            <input type="radio" value="miles" bind:group={unit} on:change={handleUnitChange} />
            Miles
          </label>
          
          <label>
            <input type="radio" value="km" bind:group={unit} on:change={handleUnitChange} />
            Kilometers
          </label>
        <div id="input" class="flex flex-col space-y-4">
            <label class="block text-sm font-medium text-gray-700" for="distance">
                Distance ({textUnit}):
                <input id="distance" class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={textDistance} step="0.01" />
            </label>
            <label class="block text-sm font-medium text-gray-700" for="hours">
                Hours:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={hours} />
            </label>

            <label class="block text-sm font-medium text-gray-700">
                Minutes:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={minutes} />
            </label>

            <label class="block text-sm font-medium text-gray-700">
                Seconds:
                <input class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={seconds} />
            </label>
        </div>

        <div id="output" class="flex flex-col mt-6">
            <p class="block text-sm font-medium text-gray-700">Your pace (minutes per {textUnit}): {formattedPace}</p>
        </div>
    </div>
    <Modal {showModal} close={() => showModal = false} />
</body>