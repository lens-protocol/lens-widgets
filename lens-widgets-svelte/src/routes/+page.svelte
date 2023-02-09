<script>
  import { ShareToLens, FollowOnLens, SignInWithLens } from '../lib'
  import { Theme, Size } from '../lib/types'

  function handleSignIn(tokens, profile) {
    console.log('tokens: ', tokens)
    console.log('profile: ', profile)
  }
</script>

<h1>Lens Widgets</h1>
<SignInWithLens
  onSignIn={handleSignIn}
  size={Size.small}
  theme={Theme.peach}
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

