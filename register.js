import React from 'react'
import addons from '@storybook/addons'
import Panel from './Panel'
import { NAME, PANEL } from './consts'

addons.register(NAME, (api) => {
  addons.addPanel(PANEL, {
    title: 'Props',
    render: () => <Panel channel={addons.getChannel()} api={api} />,
  })
})
