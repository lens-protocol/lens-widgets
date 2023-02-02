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

