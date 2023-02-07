<script lang="ts">
  import './styles.css'
  import { Theme, Size } from './types' 
  import { getContainerStyle, getTextStyle } from './utils'
  import LensIcon from './LensIcon.svelte'

  export let url: string, via:string, hashtags:string, content:string
  export let theme: Theme = Theme.default
  export let size: Size = Size.medium

  function handleClick() {
    if (!content) return
    let shareUrl = `https://lenster.xyz/?text=${encodeURIComponent(content)}`
    if (url) {
      shareUrl = shareUrl + `&url=${url}`
    }
    if (via) {
      shareUrl = shareUrl + `&via=${encodeURIComponent(via)}`
    }
    if (hashtags) {
      shareUrl = shareUrl + `&hashtags=${hashtags}`
    }
    window.open(shareUrl, '_newtab')
	}
</script>

<button style={getContainerStyle(theme, size)} class="button" on:click={handleClick}>
  <LensIcon theme={theme} size={size} />
  <p style={getTextStyle(theme, size)} class="text">Share to Lens</p>
</button>

<style>
  .button {
    outline: none;
    border: none;
    border-radius: 50;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .text {
    margin: 0px 0px 0px 6px;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
</style>