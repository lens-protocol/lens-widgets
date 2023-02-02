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

![Share to Lens](https://user-images.githubusercontent.com/1857282/216200598-43f2beb2-63bb-4455-ab0f-0c95b1d08ccb.png)

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

![Follow on Lens](https://user-images.githubusercontent.com/1857282/216201156-08523234-ea59-4d3b-a181-17aca7828f6f.png)