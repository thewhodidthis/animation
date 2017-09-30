'use strict'

const kpow = require('kpow')
const test = require('tape')
const createLoop = require('./')

kpow()

test('will throw sans callback', (t) => {
  t.throws(createLoop, new TypeError())
  t.end()
})

test('will avoid stacking', (t) => {
  const { play, stop } = createLoop(Function)
  const id = play()

  t.doesNotThrow(play, id)

  t.equals(play(), id, 'frame id hasn\'t changed')
  t.equals(play(), id, 'frame id hasn\'t changed')
  t.equals(play(), id, 'frame id hasn\'t changed')

  t.notOk(stop(), 'stop')
  t.end()
})
