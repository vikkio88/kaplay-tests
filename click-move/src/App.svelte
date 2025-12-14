<script lang="ts">
  import type { Vec2 } from "kaplay";
  import { onMount } from "svelte";
  import eb from "./bus/bus";
  import Heading from "./components/navigation/Heading.svelte";
  let speed = $state(0);
  let distance = $state(0);
  let heading: Vec2 | undefined = $state();
  onMount(() => {
    eb.on("speed", (e) => {
      const [sp, direction, dist] = e;
      speed = sp;
      heading = direction;
      distance = dist;
    });
    return () => eb.off("speed");
  });
</script>

<main>
  <h2>speed: {speed.toFixed(2)}</h2>
  <h2>distance: {distance.toFixed(2)}</h2>
  <Heading {heading} />
</main>

<style>
  main {
    padding: 2rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
</style>
