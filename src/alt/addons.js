import Alt from './'

import ActionListeners from '../utils/ActionListeners'
import AltManager from '../utils/AltManager'
import DispatcherRecorder from '../utils/DispatcherRecorder'

import atomicTransactions from '../utils/atomicTransactions'
import connectToStores from '../utils/connectToStores'
import chromeDebug from '../utils/chromeDebug'
import makeFinalStore from '../utils/makeFinalStore'
import withAltContext from '../utils/withAltContext'

import AltContainer from '../../AltContainer'

Alt.addons = {
  ActionListeners,
  AltContainer,
  AltManager,
  DispatcherRecorder,
  atomicTransactions,
  chromeDebug,
  connectToStores,
  makeFinalStore,
  withAltContext,
}

export default Alt
