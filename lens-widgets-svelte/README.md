## Lens Widgets Svelte

### Installation

```sh
npm install @lens-protocol/widgets-svelte
```

## Usage

### Share to Lens

```typescript
import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<ShareToLens
  content="Hello World!"
/>

/* Optional parameters */
url: "https://your-awesome-app.com"
hashtags: "web3,social,blockchain"
via: "YourAwesomeApp"

theme: Theme (default, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

![Share to Lens](https://user-images.githubusercontent.com/1857282/216202985-490b7043-33de-4eaf-83e3-2d412c677974.jpg)

### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (default, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

![Follow on Lens](https://user-images.githubusercontent.com/1857282/216202951-d962aaa4-3aab-4d11-bab8-0e84ea743d65.jpg)

### Sign in With Lens

```typescript
import {
  SignInWithLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

async function onSignIn(tokens, profile) {
  console.log('tokens: ', tokens)
  console.log('profile: ', profile)
}

<SignInWithLens
  onSignIn={onSignIn}
/>

/* Optional parameters */
provider: EthereumProvider
title: string
theme: Theme (default, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```
