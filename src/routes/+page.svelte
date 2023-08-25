<script>
    let distanceMi = 2; // Set initial value to avoid division by zero
    let hours = 0;
    let minutes = 4;
    let seconds = 22;
    /**
     * @type {string}
     */
    let formattedPace;
    /**
     * @type {string}
     */
    let paceKm;
    /**
     * @type {string}
     */
    let paceMile;

    $: if (distanceMi > 0) {
      let totalMinutes = (hours * 60) + minutes + (seconds / 60);
      paceMile = (totalMinutes / distanceMi).toFixed(2);

      let mins = Math.floor(parseFloat(paceMile));

      const secs = Math.round((parseFloat(paceMile) - totalMinutes) * 60);
      const secz = parseFloat((seconds / distanceMi).toFixed(1));
      formattedPace = `${mins}:${secz < 10 ? '0' : ''}${secz}`;

      let distanceKm = distanceMi / 0.621371;
      paceKm = (totalMinutes / distanceKm).toFixed(2);
    } else {
      paceKm = "Please enter a distance greater than zero";
      paceMile = "Please enter a distance greater than zero";
    }
</script>

<body class="flex bg-zinc-50 items-stretch">
    <div class="flex flex-col bg-zinc-50">  
        <nav class="flex gap-10 p-3 justify-between">
            <h1 class="basis-1/4"> andmarek </h1>
            <h1 class="basis-1/4">Pace Calculator</h1>
            <h1 class="basis-1/2"> About </h1>
        </nav>

        <div class="flex flex-col p-3">
            <div id="input" class="flex flex-col">
                <label class="block text-sm font-medium text-gray-700 px-3" for="distance">
                    Distance (mi):
                    <input id="distance" class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={distanceMi} step="0.01" />
                </label>

                <br />
                <label class="block text-sm font-medium text-gray-700 px-2" for="hours">
                    Hours:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={hours} />
                </label>

                <br />

                <label class="block text-sm font-medium text-gray-700 px-2">
                    Minutes:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={minutes} />
                </label>

                <br />

                <label class="block text-sm font-medium text-gray-700 px-2">
                    Seconds:
                    <input class="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" type="number" bind:value={seconds} />
                </label>
            </div>
            <br />
            <div id="output" class="flex flex-col">
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per kilometer): {paceKm}</p>
                <p class="block text-sm font-medium text-gray-700">Your pace (minutes per mile): {formattedPace}</p>
            </div>
        </div>
    </div>
</body>