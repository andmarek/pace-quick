<script>
    let distanceMi = 0; // Set initial value to avoid division by zero
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
    let paceMile;

    $: if (distanceMi > 0) {
      let totalMinutes = (hours * 60) + minutes + (seconds / 60);
      paceMile = (totalMinutes / distanceMi).toFixed(2);

      let mins = Math.floor(parseFloat(paceMile));

      const secs = parseFloat((seconds / distanceMi).toFixed(1));
      formattedPace = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

      let distanceKm = distanceMi / 0.621371;
      paceKm = (totalMinutes / distanceKm).toFixed(2);
    } else {
      paceKm = "Please enter a distance greater than zero";
      paceMile = "Please enter a distance greater than zero";
    }
</script>

<body class="flex bg-zinc-50 items-stretch min-h-screen">
    <div class="flex flex-col w-full">  
        <nav class="flex gap-10 p-3 justify-between bg-white shadow-md">
            <h1 class="text-lg font-semibold hover:text-indigo-500 cursor-pointer">andmarek</h1>
            <h1 class="text-lg font-semibold">Pace Calculator</h1>
            <h1 class="text-lg font-semibold hover:text-indigo-500 cursor-pointer">About</h1>
        </nav>

        <div class="flex flex-col p-6">
            <div id="input" class="flex flex-col space-y-4">
                <label class="block text-sm font-medium text-gray-700" for="distance">
                    Distance (mi):
                    <input id="distance" class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={distanceMi} step="0.01" />
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
            
            <button class="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                Calculate
            </button>

            <div id="output" class="flex flex-col mt-6">
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per kilometer): {paceKm}</p>
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per mile): {formattedPace}</p>
            </div>
        </div>
    </div>
</body>
