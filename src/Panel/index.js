import React from 'react'
import PropTypes from 'prop-types'
import { UPDATE } from '../consts'
import PropRow from './PropRow'

const getTypeNameFromProp = (prop) => {
  if (!prop.type) {
    return undefined
  }
  if (prop.type.raw === 'ViewPropTypes.style') {
    return 'style'
  }
  if (prop.type.raw === 'TextPropTypes.style') {
    return 'style'
  }

  const name = prop.type.name
  if (name === 'union') {
    if (typeof prop.type.value === 'string') {
      return `enum ( ${prop.type.value} )`
    }
    const union = prop.type.value.map((val) => val.name).join(' | ')
    return `union ( ${union} )`
  }
  if (name === 'enum') {
    if (typeof prop.type.value === 'string') {
      return `enum ( ${prop.type.value} )`
    }
    const _enum = prop.type.value.map((val) => val.value).join(' | ')
    return `enum ( ${_enum} )`
  }
  return name
}

const getDescriptionFromProp = (prop) => {
  if (prop.description && prop.description.length > 0) {
    return prop.description
  }
  return null
}

const transformDocGenPropsToRows = (props) => {
  if (!props) {
    return []
  }

  return Object.keys(props).map((propName) => ({
    name: propName,
    type: getTypeNameFromProp(props[propName]),
    required: props[propName].required,
    defaultValue: props[propName].defaultValue && props[propName].defaultValue.value,
    description: getDescriptionFromProp(props[propName]),
  }))
}

class Panel extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { props: undefined, passThroughProps: undefined }
    this.onUpdate = this.onUpdate.bind(this)
    this.onSelectPassThroughPropsLink = this.onSelectPassThroughPropsLink.bind(this)
  }

  onUpdate(state) {
    let passThroughProps = undefined
    if (typeof state.passThroughProps === 'string') {
      const passThroughPropsPath = state.passThroughProps.split('/')
      const passThroughKindPath = passThroughPropsPath.slice(0, passThroughPropsPath.length - 1)
      const story = passThroughPropsPath[passThroughPropsPath.length - 1]
      const kind = passThroughKindPath.length ? passThroughKindPath.join('/') : undefined

      passThroughProps = { kind, story }
    } else {
      passThroughProps = state.passThroughProps
    }
    this.setState({ props: state.props, passThroughProps })
  }

  onSelectPassThroughPropsLink() {
    if (this.state.passThroughProps.kind) {
      this.props.api.selectStory(
        this.state.passThroughProps.kind,
        this.state.passThroughProps.story,
      )
    } else {
      this.props.api.selectInCurrentKind(this.state.passThroughProps.story)
    }
  }

  componentDidMount() {
    const { channel, api } = this.props
    channel.on(UPDATE, this.onUpdate)

    this.stopListeningOnStory = api.onStory(() => {
      this.onUpdate({})
    })
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory()
    }

    const { channel } = this.props
    channel.removeListener(UPDATE, this.onUpdate)
  }

  render() {
    const propRows = transformDocGenPropsToRows(this.state.props)
    return (
      <div style={{ flex: 1, alignSelf: 'stretch' }}>
        {propRows.map((propRow) => (
          <PropRow
            key={propRow.name}
            name={propRow.name}
            type={propRow.type}
            description={propRow.description}
            defaultValue={propRow.defaultValue}
            required={propRow.required}
          />
        ))}
        {this.state.passThroughProps && (
          <a onClick={this.onSelectPassThroughPropsLink}>
            <PropRow
              prefix="..."
              name={this.state.passThroughProps.name || this.state.passThroughProps.story}
              type="pass through props"
              description={this.state.passThroughProps.description}
            />
          </a>
        )}
      </div>
    )
  }
}

Panel.propTypes = {
  api: PropTypes.shape({
    selectStory: PropTypes.func.required,
    selectInCurrentKind: PropTypes.func.required,
  }),
  channel: PropTypes.any,
}

Panel.displayName = 'PropsAddonPanel'

export default Panel
