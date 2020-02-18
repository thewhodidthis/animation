import 'cutaway'
import { report, assert } from 'tapeless/browser'
import createLoop from './index.mjs'

const { ok, notOk, equal } = assert

try {
  createLoop()
} catch (e) {
  ok
    .describe('thrown')
    .test(e)
    .describe('TypeError', 'will throw sans callback')
    .test(e instanceof TypeError)
}

const { play, stop } = createLoop(Function)

try {
  const f = play()

  ok
    .describe('play', 'does not throw')
    .test(f)
} catch (e) {
  ok
    .describe('unexpected')
    .test(e)
}

const id = play()

equal
  .describe('frame id hasn\'t changed')
  .test(play(), id)
  .describe('frame id hasn\'t changed')
  .test(play(), id)
  .describe('frame id hasn\'t changed', 'will avoid stacking')
  .test(play(), id)

notOk
  .describe('stop')
  .test(stop())

report()
