<script lang="ts">
  import type { Vec2 } from "kaplay";
  import { onMount } from "svelte";
  import eb from "./bus/bus";
  import Heading from "./components/navigation/Heading.svelte";
  let speed = $state(0);
  let heading: Vec2 | undefined = $state();
  onMount(() => {
    eb.on("speed", (e) => {
      const [sp, direction] = e;
      speed = sp;
      heading = direction;
    });
    return () => eb.off("speed");
  });
</script>

<main>
  <h2>{speed.toFixed(2)}</h2>
  <Heading {heading} />
</main>

<style>
  main {
    padding: 2rem;
  }
</style>
