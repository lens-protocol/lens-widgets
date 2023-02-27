## Lens Widgets Svelte

### Installation

```sh
npm install @lens-protocol/widgets-svelte
```

### Available Components 

- [Share to Lens](#share-to-lens)
- [Follow on Lens](#follow-on-lens)
- [Sign in With Lens](#sign-in-with-lens)
- [Profile](#profile)

### Share to Lens

```typescript
import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<ShareToLens
  content="Hello World!"
/>

/* Optional parameters */
url: string = "https://your-awesome-app.com"
hashtags: string = "web3,social,blockchain"
via: string =  "YourAwesomeApp"
title: string = "Share your post on Lens 🌿"
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-svelte'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
title: string = "Follow me on Lens"
```

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
provider: Provider
title: string
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

### Profile

```typescript
import {
  Profile, Theme
} from '@lens-protocol/widgets-svelte'

<Profile
  handle="stani"
/>

/* Optional parameters */
handle: string
ethereumAddress: string
profileId: string
theme: Theme (default, dark)
onClick: () => void
containerStyle: css style
```
