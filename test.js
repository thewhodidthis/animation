import 'cutaway'
import { report, assert } from 'tapeless'
import createLoop from './index.mjs'

const { ok, equal } = assert

try {
  createLoop()
} catch (e) {
  ok(e, 'thrown', 'will throw sans callback')
  ok(e instanceof TypeError, 'TypeError')
}

const { play, stop } = createLoop(Function)

try {
  const f = play()

  ok(f, 'play', 'does not throw')
} catch (e) {
  ok(e, 'unexpected')
}

const id = play()

equal(play(), id, 'frame id hasn\'t changed', 'will avoid stacking')
equal(play(), id, 'frame id hasn\'t changed')
equal(play(), id, 'frame id hasn\'t changed')

ok(!stop(), 'stop')

report()
