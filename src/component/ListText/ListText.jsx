import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, TIcon, TMemo, merge, clone } from 'tinput'

import styles from './styles.js'

class ListText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.clearValue = this.clearValue.bind(this)
  }

  clearValue() {
    this.setState({ value: null })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.value !== nextProps.value ||
      this.props.id !== nextProps.id ||
      this.state.value !== nextState.value
    )
  }

  handleAdd(event) {
    this.setState({ value: event.value }, () => {
      let value = this.props.value ? clone(this.props.value) : []
      value.push({ id: null, order: 0, name: 'new text' })
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          data: this.props.data,
          value: value
        })
      }
      this.clearValue()
    })
  }

  handleDelete(event) {
    let index = event.data
    if (index >= 0) {
      let value = clone(this.props.value)
      value.splice(index, 1)
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          data: this.props.data,
          value: value
        })
      }
    }
    this.clearValue()
  }

  render() {
    let style = merge(styles, this.props.style)

    let list = this.props.value
      ? this.props.value.map((v, i) => {
          let item = this.props.onItem ? (
            this.props.onItem({ item: v, style: style, index: i })
          ) : (
            <TMemo style={style.text} value={v.name} />
          )
          return (
            <div key={i} style={style.item}>
              {item}
              <TIcon
                style={style.iconDelete}
                name={'delete'}
                onClick={this.handleDelete}
                data={i}
              />
            </div>
          )
        })
      : null

    return (
      <TGroup style={style.group} label={this.props.label}>
        {list}
        <div style={style.bottom}>
          <TIcon style={style.iconAdd} name={'add'} onClick={this.handleAdd} />
        </div>
      </TGroup>
    )
  }
}

ListText.propTypes = {
  style: PropTypes.object,
  value: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.any,
  table: PropTypes.string,
  id: PropTypes.number,
  modal: PropTypes.any,
  caption: PropTypes.any,
  chars: PropTypes.number,
  placeholder: PropTypes.string,
  showIcon: PropTypes.any,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onItem: PropTypes.func
}

ListText.defaultProps = {
  showIcon: true
}

export default ListText
