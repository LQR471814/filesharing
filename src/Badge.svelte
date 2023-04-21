<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let number: number;
</script>

{#if number > 0}
  <div
    class={twMerge(
      "flex justify-center items-center bg-red-500 rounded-full",
      "text-white font-bold absolute top-[-12px] right-[-12px]",
      number === null ? "w-4 h-4" : "w-6 h-6"
    )}
  >
    {number < 10 ? number : "9+"}
  </div>
{/if}
