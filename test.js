'use strict'

const kpow = require('kpow')
const test = require('tape')
const Animation = require('./')

kpow()

test('will throw sans callback', (t) => {
  t.throws(Animation, new TypeError())
  t.end()
})

test('will avoid stacking', (t) => {
  const animation = Animation(Function)
  const id = animation.start()

  t.doesNotThrow(animation.start, id)

  t.equals(animation.start(), id, 'frame id hasn\'t changed')
  t.equals(animation.start(), id, 'frame id hasn\'t changed')
  t.equals(animation.start(), id, 'frame id hasn\'t changed')

  t.notOk(animation.stop(), 'stop')
  t.end()
})
