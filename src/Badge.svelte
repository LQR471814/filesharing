<script lang="ts">
  export let number: number;
</script>

{#if number > 0}
  <div
    class={[
      "flex justify-center items-center",
      `bg-red-500 rounded-full ${number === null ? "w-4 h-4" : "w-6 h-6"}`,
      "text-white font-bold",
      "absolute top-[-12px] right-[-12px]"
    ].join(" ")}
  >
    {number < 10 ? number : "9+"}
  </div>
{/if}
