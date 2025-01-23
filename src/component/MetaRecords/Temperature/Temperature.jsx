import React from 'react'
import PropTypes from 'prop-types'

import {
  merge,
  clone,
  post,
  strDate,
  cutTime,
  toObj,
  TDate,
  TText
} from 'tinput'

import styles from './styles.js'

class Temperature extends React.PureComponent {
  constructor(props) {
    super(props)
    this.value = props.value
    this.state = { value: clone(props.value) }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getObj = this.getObj.bind(this)
    this.getKey = this.getKey.bind(this)
    this.getEmpty = this.getEmpty.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getObj() {
    return toObj(this.state.value?.data?.list?.[0]?.name) || {}
  }

  getKey() {
    return this.state.value?.data?.list?.[0]?.key
  }

  getEmpty() {
    const obj = this.getObj()
    return (
      (!obj.moTemp || obj.moTemp === '') &&
      (!obj.evTemp || obj.evTemp === '') &&
      (!obj.moArtPress || obj.moArtPress === '') &&
      (!obj.evArtPress || obj.evArtPress === '') &&
      (!obj.moPulse || obj.moPulse === '') &&
      (!obj.evPulse || obj.evPulse === '') &&
      (!obj.breath || obj.breath === '') &&
      (!obj.weight || obj.weight === '') &&
      (!obj.liquid || obj.liquid === '') &&
      (!obj.water || obj.water === '') &&
      (!obj.enuresis || obj.enuresis === '') &&
      (!obj.stool || obj.stool === '') &&
      (!obj.bath || obj.bath === '') &&
      (!obj.pediculosis || obj.pediculosis === '')
    )
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.getKey(),
        save: save,
        cancel: cancel
      })
    }
  }

  delete() {
    if (this.props.onDelete) {
      this.props.onDelete({ key: this.getKey() })
    }
  }

  cancel() {
    this.setState({ value: clone(this.value) }, () => {
      this.notify()
      if (this.getEmpty()) this.delete()
    })
  }

  save() {
    const value = clone(this.state.value)
    if (this.getEmpty()) value.data.list[0].name = null
    post({
      url: `/rest/${this.props.project}/${this.props.name}/update`,
      data: { data: [value] },
      sender: this,
      success: data => {
        this.value = clone(data[0])
        this.setState({ value: clone(this.value) }, () => {
          this.notify()
          if (this.getEmpty()) this.delete()
        })
      }
    })
  }

  handleChange(event) {
    const value = clone(this.state.value)
    const obj = toObj(value.data.list[0].name) || {}
    if ('date' === event.name) {
      obj.date = strDate(event.value)
      value.data.list[0].name = JSON.stringify(obj)
      value.data.list[0].date = event.value
    } else if ('time' === event.name) {
      obj.time = cutTime(event.value)
      value.data.list[0].name = JSON.stringify(obj)
      value.data.list[0].time = event.value
    } else if ('day' === event.name) {
      obj.day = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('moTemp' === event.name) {
      obj.moTemp = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('evTemp' === event.name) {
      obj.evTemp = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('moArtPress' === event.name) {
      obj.moArtPress = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('evArtPress' === event.name) {
      obj.evArtPress = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('moPulse' === event.name) {
      obj.moPulse = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('evPulse' === event.name) {
      obj.evPulse = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('breath' === event.name) {
      obj.breath = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('weight' === event.name) {
      obj.weight = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('liquid' === event.name) {
      obj.liquid = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('water' === event.name) {
      obj.water = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('enuresis' === event.name) {
      obj.enuresis = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('stool' === event.name) {
      obj.stool = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('bath' === event.name) {
      obj.bath = event.value
      value.data.list[0].name = JSON.stringify(obj)
    } else if ('pediculosis' === event.name) {
      obj.pediculosis = event.value
      value.data.list[0].name = JSON.stringify(obj)
    }
    this.setState({ value }, () => {
      this.notify(this.save, this.cancel)
    })
  }

  render() {
    const style = merge(styles, this.props.style)

    const obj = this.getObj()

    return (
      <div style={style.container}>
        <div style={style.row}>
          <div style={style.left}>
            <TDate
              style={style.date}
              name={'date'}
              value={obj.date}
              onChange={this.handleChange}
            />
            <TText
              style={style.day}
              name={'day'}
              value={obj.day}
              regexp={TText.regexp.number}
              label={'День болезни:'}
              required={'never'}
              onChange={this.handleChange}
            />
          </div>
          <div style={style.user}>{obj.user?.name}</div>
        </div>

        <table style={style.table.container}>
          <thead style={style.table.head}>
            <tr>
              <td style={style.table.caption} colSpan={2}>
                Т
              </td>
              <td style={style.table.caption} colSpan={2}>
                АД
              </td>
              <td style={style.table.caption} colSpan={2}>
                П
              </td>
            </tr>
            <tr>
              <td style={style.table.caption}>Утро</td>
              <td style={style.table.caption}>Вечер</td>
              <td style={style.table.caption}>Утро</td>
              <td style={style.table.caption}>Вечер</td>
              <td style={style.table.caption}>Утро</td>
              <td style={style.table.caption}>Вечер</td>
            </tr>
          </thead>
          <tbody style={style.table.body}>
            <tr>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'moTemp'}
                  value={obj.moTemp}
                  regexp={TText.regexp.float}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'evTemp'}
                  value={obj.evTemp}
                  regexp={TText.regexp.float}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'moArtPress'}
                  value={obj.moArtPress}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'evArtPress'}
                  value={obj.evArtPress}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'moPulse'}
                  value={obj.moPulse}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'evPulse'}
                  value={obj.evPulse}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table style={style.table.container}>
          <thead style={style.table.head}>
            <tr>
              <td style={style.table.caption}>Дыхание</td>
              <td style={style.table.caption}>Вес, кг</td>
              <td style={style.table.caption}>Выпито жидкости, мл</td>
              <td style={style.table.caption}>Суточное кол-во воды, мл</td>
              <td style={style.table.caption}>Энурез, да/нет</td>
              <td style={style.table.caption}>Стул да/нет</td>
              <td style={style.table.caption}>Ванна</td>
              <td style={style.table.caption}>Педикулёз, да/нет</td>
            </tr>
          </thead>
          <tbody style={style.table.body}>
            <tr>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'breath'}
                  value={obj.breath}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'weight'}
                  value={obj.weight}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'liquid'}
                  value={obj.liquid}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'water'}
                  value={obj.water}
                  regexp={TText.regexp.number}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'enuresis'}
                  value={obj.enuresis}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'stool'}
                  value={obj.stool}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'bath'}
                  value={obj.bath}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
              <td style={style.table.data}>
                <TText
                  style={style.param}
                  name={'pediculosis'}
                  value={obj.pediculosis}
                  required={'never'}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Temperature.getEmpty = function ({ current, user = {}, index = 0 }) {
  const obj = {
    type: 'temperature',
    user: { id: user.id, name: user.name },
    date: strDate(current),
    time: cutTime(current),
    day: `${index + 1}`
  }
  return JSON.stringify(obj)
}

Temperature.propTypes = {
  style: PropTypes.object,
  value: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

Temperature.defaultProps = {
  project: 'hosp'
}

export default Temperature
