<script lang="ts">
  export let item: any = {};
  export let isLoading: boolean = false;

  function formatText(text: string) {
    const codeBlockRegex = /```[\s\S]*?```/g;
    // Regex to handle the list format as shown in the screenshot
    const listItemRegex = /\d+\.\s/g;

    const parts = text.split(codeBlockRegex);
    const codeBlocks = text.match(codeBlockRegex) || [];

    // Replace the list item format with a <br> tag for new lines
    const formattedParts = parts.map((part, index) => {
      // Split the text on the list item pattern and join with <br>
      const splitList = part.split(listItemRegex);
      const formattedList = splitList.join("<br>");

      return {
        text: formattedList,
        isCode: false,
      };
    });

    // Rebuild the text by interleaving code blocks and formatted parts
    return formattedParts.flatMap((part, index) => [
      part,
      ...(index < codeBlocks.length
        ? [{ text: codeBlocks[index], isCode: true }]
        : []),
    ]);
  }
</script>

{#if isLoading}
  <div class="grid grid-row-[1fr_auto] w-full overflow-y-auto mb-24">
    <div class="grid grid-cols-[auto_1fr] gap-2 max-w-2xl">
      <div
        class="card m-2 p-4 h-auto variant-soft-surface rounded-tl-none space-y-2"
      >
        <header class="flex justify-between items-center">
          <p class="font-bold">NodeBot</p>
        </header>
        <p>Typing...</p>
      </div>
    </div>
  </div>
{:else}
  <div
    class="grid grid-cols-[auto_1fr] gap-2 max-w-2xl {item.isQuestion
      ? 'ml-auto right-0'
      : ''}"
  >
    <div
      class="card m-2 p-4 h-auto {item.isQuestion
        ? 'variant-soft-primary rounded-tr-none'
        : 'variant-soft-surface rounded-tl-none'} space-y-2"
    >
      <header class="flex justify-between items-center">
        <p class="font-bold">{item.isQuestion ? "You" : "NodeBot"}</p>
      </header>
      {#each formatText(item.text) as part}
        {#if part.isCode}
          <pre
            class="bg-gray-100 border border-gray-300 rounded p-2 overflow-auto text-sm text-gray-800">
            <code>{@html part.text.replace(/^```|```$/g, "")}</code>
          </pre>
        {:else}
          {@html part.text}
        {/if}
      {/each}
    </div>
  </div>
{/if}
