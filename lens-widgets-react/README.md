## Lens Widgets React

### Installation

```sh
npm install @lens-protocol/widgets-react
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
} from '@lens-protocol/widgets-react'

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

![Share to Lens](https://arweave.net/kjf9gWxLkliQku0J_d7b1YTV9rb8m5tPpoqjJ2IaJhI)

### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-react'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (default, dark, light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
title: string = "Follow me on Lens"
```

![Follow on Lens](https://arweave.net/x_3k0DBeOtHx1zQYquXoLG-Xho1o1aTB2w82xy0KxNk)

### Sign in With Lens

```typescript
import {
  SignInWithLens, Theme, Size
} from '@lens-protocol/widgets-react'

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

![Lens Widgets - Sign in with Lens Button](https://arweave.net/DDTfRhj9e_ZZxsX-jOMNSZ5BpxvArnrRI_OxQ3uiawI)

### Profile

```typescript
import {
  Profile, Theme
} from '@lens-protocol/widgets-react'

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

![Lens Widgets - Profile Component](https://arweave.net/rzwHvxSBm55rn4nGCm0Y_a4S_GOk9z3Wjmh-Qpj3Q1Y)