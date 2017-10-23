> Helps setup raf based loops

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/animation
```

### Usage
```js
import createLoop from '@thewhodidthis/animation'

// Logs frameId
const animation = createLoop(console.log).start()
```
