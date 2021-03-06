import Alt from '../dist/alt-with-runtime'
import { assert } from 'chai'
import sinon from 'sinon'

const alt = new Alt()
const action = alt.generateActions('fire')

const beforeEach = sinon.spy()
const afterEach = sinon.spy()

const store = alt.createStore({
  displayName: 'Store',

  state: { a: 1 },

  bindListeners: {
    change: action.fire
  },

  lifecycle: {
    beforeEach,
    afterEach
  },

  change(x) {
    this.setState({ a: x })
  },
})

export default {
  'Before and After hooks': {
    beforeEach() {
      alt.recycle()
    },

    'before and after hook fire once'() {
      action.fire(2)

      assert.ok(beforeEach.calledOnce)
      assert.ok(afterEach.calledOnce)
    },

    'before is called before after'() {
      action.fire(2)

      assert.ok(beforeEach.calledBefore(afterEach))
      assert.ok(afterEach.calledAfter(beforeEach))
    },

    'args passed in'() {
      action.fire(2)

      assert.ok(beforeEach.args[0].length === 2, '2 args are passed')
      assert.ok(afterEach.args[0].length === 2, '2 args are passed')

      assert.ok(beforeEach.args[0][0].data === 2, 'before has payload')
      assert.ok(afterEach.args[0][0].data === 2, 'after has payload')
    },

    'before and after get state'() {
      let beforeValue = null
      let afterValue = null

      const store = alt.createStore({
        displayName: 'SpecialStore',
        state: { a: 1 },
        bindListeners: {
          change: action.fire
        },
        lifecycle: {
          beforeEach(x, state) {
            beforeValue = state.a
          },
          afterEach(x, state) {
            afterValue = state.a
          }
        },
        change(x) {
          this.setState({ a: x })
        }
      })

      action.fire(2)

      assert.ok(beforeValue === 1, 'before has current state')
      assert.ok(afterValue === 2, 'after has next state')
    },

    'deprecated warning'() {
      console.warn = sinon.spy()

      class Foo {
        constructor() {
          this.bindListeners({
            change: action.fire
          })
        }
        beforeEach() { }
        afterEach() { }
        change() { }
      }

      assert(console.warn.callCount === 0)

      alt.createStore(Foo)

      action.fire()

      assert.ok(console.warn.calledTwice)
    }
  }
}
