<script>
  import {
    ShareToLens,
    FollowOnLens,
    SignInWithLens,
    Profile
  } from '../lib'
  import { Theme, Size } from '../lib/types'

  function handleSignIn(tokens, profile) {
    console.log('tokens: ', tokens)
    console.log('profile: ', profile)
  }
</script>

<div style="margin-top: 20px;">

<Profile
  profileId="0x28a2"
/>
<br />
<SignInWithLens
  onSignIn={handleSignIn}
  size={Size.small}
  theme={Theme.peach}
  title="Sign in here!"
/>
<br />
<SignInWithLens
  onSignIn={handleSignIn}
  size={Size.large}
  theme={Theme.lavender}
/>
<br />
<ShareToLens
  content="Hello World"
  size={Size.small}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
  title="Share your post to Lens 🌿"
/>
<br />

<ShareToLens
  content="Hello World"
  size={Size.small}
  theme={Theme.peach}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
/>
<br />
<ShareToLens
  content="Hello World"
  theme={Theme.lavender}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
/>
<br />
<ShareToLens
  content="Hello World"
  theme={Theme.blonde}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
/>
<br />
<ShareToLens
  content="Hello World"
  theme={Theme.mint}
  size={Size.large}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
/>
<br />
<ShareToLens
  content="Hello World"
  theme={Theme.light}
  size={Size.large}
  url="https://your-awesome-app.com"
  hashtags="web3,social,blockchain"
  via="YourAwesomeApp"
/>
<br />
<FollowOnLens
  handle="stani" theme={Theme.lavender}
/>

<br />
<FollowOnLens 
  handle="stani" theme={Theme.mint}
/>

<br />
<FollowOnLens
  handle="stani"
/>

</div>


<style>
  :global(body) {
    margin: 0;
    padding: 0px 20px;
    background-color: #404040;
  }
</style>