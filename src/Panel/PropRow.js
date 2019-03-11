import React from 'react'
import PropTypes from 'prop-types'

export const isRenderableValue = (value) => !!value || typeof value === 'number'

const PropRow = ({ prefix, name, type, description, defaultValue, required }) => (
  <div style={styles.container}>
    <div style={styles.header}>
      {prefix && <span style={styles.prefix}>{prefix}</span>}
      <span style={styles.name}>{name}</span>
      {type && <span style={styles.type}>{type}</span>}
      {isRenderableValue(defaultValue) && (
        <span style={styles.defaultValue}> = {`${defaultValue}`}</span>
      )}
      {required && <span style={styles.required}>required</span>}
    </div>
    {description && <div style={styles.description}>{description}</div>}
  </div>
)

PropRow.propTypes = {
  prefix: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  defaultValue: PropTypes.any,
  required: PropTypes.bool,
}

export default PropRow

const fontFamily =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'

const textTagStyle = {
  boxSizing: 'border-box',
  fontSize: 12,
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 4,
  paddingRight: 4,
  borderRadius: 4,
  fontFamily,
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 12,
    paddingRight: 12,
  },
  header: {
    padding: 6,
    flex: 1,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#F4F5F7',
    borderStyle: 'solid',
  },
  prefix: {
    ...textTagStyle,
    color: '#787878',
    marginRight: 4,
  },
  name: {
    ...textTagStyle,
    backgroundColor: '#D1EFFF',
    color: '#015F91',
  },
  type: {
    ...textTagStyle,
    backgroundColor: '#F2F2F2',
    color: '#787878',
    marginLeft: 10,
  },
  defaultValue: {
    ...textTagStyle,
    paddingHorizontal: 0,
    color: '#454545',
  },
  required: {
    ...textTagStyle,
    backgroundColor: '#DEFFD9',
    color: '#106E00',
    marginLeft: 10,
  },
  description: {
    fontFamily,
    padding: 6,
    fontSize: 12,
  },
}
