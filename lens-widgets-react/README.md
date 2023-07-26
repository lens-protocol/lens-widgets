## Lens Widgets React library

### Installation

```sh
npm install @lens-protocol/widgets-react
```

### With Next.js

If you are using Next.js `pages` directory please update your `next.config.js` with the following:

```javascript
transpilePackages: ['@lens-protocol'],
```

So the final configuration might look like this:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@lens-protocol']
}
module.exports = nextConfig
```

Once this update is made, please re-run the server:

```sh
npm run dev
```

Another option when working with Next.js `pages` directory apps is using a Dynamic Import:

```typescript
/* Profile created in separate component */
import {
  Profile
} from '@lens-protocol/widgets-react'

export default function ProfileComponent() {
  return (
    <Profile handle='christina' />
  )
}

/* ProfileComponent imported using a dynamic import */
import dynamic from 'next/dynamic'
const ProfileComponent = dynamic(() => import('../components/ProfileComponent'), { ssr: false })

export default () => {
  return (
    <div>
      <ProfileComponent />
    </div>
  )
}
```

