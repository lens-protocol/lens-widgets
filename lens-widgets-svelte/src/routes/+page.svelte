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
<!-- 
<Profile
  handle="stani"
/> -->
<br />
<Profile hideFollowButton handle='christina' />
</div>


<style>
  :global(body) {
    margin: 0;
    padding: 0px 20px;
    background-color: #f3f3f3;
  }
</style>