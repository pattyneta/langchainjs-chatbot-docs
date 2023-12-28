<script lang="ts">
  let question = "";
  let conversation: { id: number; text: string; isQuestion: boolean }[] = [];
  let isLoading = false;
  let error: string | null = null;

  async function ask() {
    isLoading = true;

    const newQuestion = {
      id: conversation.length + 1,
      text: question,
      isQuestion: true,
    };
    conversation = [...conversation, newQuestion];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const newResponse = {
          id: conversation.length + 1,
          text: data,
          isQuestion: false,
        };
        console.log(newResponse);
        conversation = [...conversation, newResponse];
      } else {
        error = "Failed to fetch data. Please try again.";
      }
    } catch (e) {
      error = "An error occurred. Please try again later.";
    }

    isLoading = false;
  }
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
  function onKeyUp(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode == 13 && event.shiftKey)
    {
        event.preventDefault();
        return;
    }
    if (event.key === "Enter") {
      ask();
    };

  }
</script>

<div class="h-full w-full justify-center items-center relative">
  <div class="grid grid-row-[1fr_auto] w-full overflow-y-auto mb-24">
    {#each conversation as item (item.id)}
      <div
        class="grid grid-cols-[auto_1fr] gap-2 max-w-2xl {item.isQuestion
          ? ''
          : 'ml-auto right-0'}"
      >
        <div
          class="card m-2 p-4 h-auto {item.isQuestion
            ? 'variant-soft rounded-tl-none'
            : 'rounded-tr-none'} space-y-2"
        >
          <header class="flex justify-between items-center">
            <p class="font-bold">{item.isQuestion ? "You" : "NodeBot"}</p>
          </header>
          {#each formatText(item.text) as part}
            {#if part.isCode}
              <pre
                class="bg-gray-100 border border-gray-300 rounded p-2 overflow-auto text-sm text-gray-800">
      <code>{part.text.replace(/^```|```$/g, "")}</code>
    </pre>
            {:else}
              {@html part.text}
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
  {#if isLoading}
    <div class="grid grid-row-[1fr_auto] w-full overflow-y-auto mb-24">
      <div class="grid grid-cols-[auto_1fr] gap-2 max-w-2xl ml-auto right-0">
        <div class="card m-2 p-4 h-auto variant-soft rounded-tl-none space-y-2">
          <header class="flex justify-between items-center">
            <p class="font-bold">NodeBot</p>
          </header>
          <p>Typing...</p>
        </div>
      </div>
    </div>
  {/if}
  {#if error}
    <p>{error}</p>
  {/if}
  <div
    class="border-t border-surface-500/30 bg-surface-800 p-4 fixed bottom-0 w-full h-18 overflow-x-none"
  >
    <div class="input-group input-group-divider flex rounded-container-token">
      <textarea
        class="bg-transparent border-0 ring-0 flex-1"
        title="URL Input"
        placeholder="Ask your question here..."
        bind:value={question}
        on:keyup={onKeyUp}
      />
      <button type="button" class="input-group-shim w-20" on:click={ask}
        >Submit</button
      >
    </div>
  </div>
</div>
