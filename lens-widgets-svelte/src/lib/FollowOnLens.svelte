<script lang="ts">
  import './styles.css'
  import { Theme, Size } from './types' 
  import { getContainerStyle, getTextStyle } from './utils'
  import LensIcon from './LensIcon.svelte'

  export let handle: string;
  export let size = Size.medium;
  export let theme= Theme.default;

  function navigate() {
    if (!handle.includes('.lens')) {
      handle = handle + '.lens'
    }
    const uri = `https://www.lensfrens.xyz/${handle.toLowerCase()}/follow`
    window.open(uri, '_newtab')
	}

  function handleWithoutLens(handle: string) {
    if (handle.includes('.lens')) {
      handle = handle.split('.')[0]
    }
    return '@' + handle
  }
</script>

<button style={getContainerStyle(theme, size)} class="button" on:click={navigate}>
  <LensIcon theme={theme} size={size} />
  <p style={getTextStyle(theme, size)} class="text">
    Follow {handleWithoutLens(handle)} on Lens
  </p>
</button>
