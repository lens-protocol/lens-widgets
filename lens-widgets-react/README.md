## Lens Widgets React

### Installation

```sh
npm install @lens-protocol/widgets-react
```

## Usage

### Share to Lens

```typescript
import {
  ShareToLens, Theme, Size
} from '@lens-protocol/widgets-react'

<ShareToLens
  content="Hello World!"
/>

/* Optional parameters */
url: "https://your-awesome-app.com"
hashtags: "web3,social,blockchain"
via: "YourAwesomeApp"

theme: Theme (light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

![Share to Lens](https://user-images.githubusercontent.com/1857282/216202985-490b7043-33de-4eaf-83e3-2d412c677974.jpg)

### Follow on Lens

```typescript
import {
  FollowOnLens, Theme, Size
} from '@lens-protocol/widgets-react'

<FollowOnLens
  handle="stani"
/>

/* Optional parameters */
theme: Theme (light, mint, green, peach, lavender, blonde)
size: Size (small, medium, large)
```

![Follow on Lens](https://user-images.githubusercontent.com/1857282/216202951-d962aaa4-3aab-4d11-bab8-0e84ea743d65.jpg)