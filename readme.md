> Helps setup raf based loops

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/animation
```

### Usage
```js
import createLoop from '@thewhodidthis/animation'

// Logs frameId, elapsed time on every tick
createLoop(console.log).start()
```

### Test
```sh
npm i && npm t
```
