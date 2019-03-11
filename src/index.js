import React from 'react'
import addons from '@storybook/addons'
import { UPDATE } from './consts'

const getPropsFromComponentOrObject = (componentOrObject) => {
  const info = componentOrObject.__docgenInfo
  const docGenProps = info && info.props
  if (docGenProps) {
    return docGenProps
  }
  if (typeof componentOrObject === 'object') {
    return componentOrObject
  }
  return {}
}

export const withPropsOf = (componentOrObject, config) => (storyFn, context) => {
  class WithProps extends React.Component {
    static displayName = 'withProps'
    render() {
      const channel = addons.getChannel()
      const props = getPropsFromComponentOrObject(componentOrObject)
      channel.emit(UPDATE, { props, ...config })
      return storyFn(context)
    }
  }

  return <WithProps />
}

withPropsOf.displayName = 'withPropsOf'
