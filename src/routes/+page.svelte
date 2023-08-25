<script>
    let distanceMi = 1; // Set initial value to avoid division by zero
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    /**
     * @type {string}
     */
    let desirablePace;
    /**
     * @type {string}
     */
    let paceKm;
    /**
     * @type {string}
     */
    let paceMile;
    // Reactively calculate pace whenever distance or time values change
    $: if (distanceMi > 0) {
      let totalMinutes = hours * 60 + minutes + seconds / 60;
      paceMile = (totalMinutes / distanceMi).toFixed(2);

      let mins = Math.floor(parseFloat(paceMile));
      const secs = Math.round((parseFloat(paceMile) - minutes) * 60);

      desirablePace = `${mins}:${seconds < 10 ? '0' : ''}${seconds}`;

      let distanceKm = distanceMi / 0.621371;
      paceKm = (totalMinutes / distanceKm).toFixed(2);
    } else {
      paceKm = "Please enter a distance greater than zero";
      paceMile = "Please enter a distance greater than zero";
    }
</script>

<body class="bg-zinc-50">
    <div class="flex flex-col bg-zinc-50">  
        <h1 class="flex justify-center bg-indigo-500">Pace Calculator</h1>

        <div class="flex flex-col p-3">
            <div id="input" class="flex flex-row">
                <label class="block text-sm font-medium text-gray-700" for="distance">
                    Distance (mi):
                    <input id="distance" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={distanceMi} step="0.01" />
                </label>

                <br />
                <label class="block text-sm font-medium text-gray-700" for="hours">
                    Hours:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={hours} />
                </label>

                <br />

                <label class="block text-sm font-medium text-gray-700">
                    Minutes:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={minutes} />
                </label>

                <br />

                <label class="block text-sm font-medium text-gray-700">
                    Seconds:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={seconds} />
                </label>
            </div>
            <br />
            <div id="output" class="flex flex-col">
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per kilometer): {paceKm}</p>
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per mile): {desirablePace}</p>
            </div>
        </div>
    </div>
</body>