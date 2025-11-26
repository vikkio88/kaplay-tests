<script lang="ts">
  import type { Vec2 } from "kaplay";
  import { Angle } from "../../libs/math";

  type Props = {
    heading?: Vec2;
  };

  let { heading }: Props = $props();

  let direction = $derived(heading ? Angle.fromVec2(heading) : undefined);
</script>

<h2>dir: {direction}</h2>
