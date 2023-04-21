<script lang="ts">
  import { BrowserFileStream, Transfer, type ClientFile } from "websocket-ftp";
  import { HOST } from "./common";

  export let id: string | null;

  const upload = (
    e: Event & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    if (!e.currentTarget.files || !id) {
      return;
    }

    const files: ClientFile[] = [];
    for (const f of e.currentTarget.files) {
      files.push({
        Name: f.name,
        Size: f.size,
        Type: f.type,
        data: new BrowserFileStream(f),
      });
    }

    e.currentTarget.value = "";

    new Transfer(`ws://${HOST}/upload?peer=${id}`, files, {
      onsuccess: () => console.info("file transfer success!"),
    });
  };
</script>

<input class="hidden" id="file-input" type="file" multiple on:change={upload} />
