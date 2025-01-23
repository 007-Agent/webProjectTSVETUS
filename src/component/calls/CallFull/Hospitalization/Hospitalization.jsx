import React from 'react'
import PropTypes from 'prop-types'

import { TGroup, TText, merge, post, clone } from 'tinput'

import MetaData from 'component/MetaData'
import Ref from 'component/Ref'

import styles from './styles.js'

class Hospitalization extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.data = clone(props.data)
    this.state = {
      data: props.data,
      modified: false
    }
    this.save = this.save.bind(this)
    this.cancel = this.cancel.bind(this)
    this.notify = this.notify.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  notify(save, cancel) {
    if (this.props.onChange) {
      this.props.onChange({
        name: this.props.name,
        save: save,
        cancel: cancel
      })
    }
  }

  cancel() {
    this.setState(
      {
        data: this.data,
        modified: false
      },
      () => {
        this.data = clone(this.data)
        this.notify()
      }
    )
  }

  save() {
    post({
      url: '/rest/help/hospitalization/update',
      data: { data: this.state.data },
      sender: this,
      success: data => {
        this.setState(
          {
            data: data,
            modified: false
          },
          () => {
            this.data = clone(data)
            this.notify()
          }
        )
      }
    })
  }

  handleChange(event) {
    let data = {
      ...clone(this.state.data),
      [event.name]: event.value
    }

    this.setState(
      {
        data: data,
        modified: true
      },
      () => {
        this.notify(this.save, this.cancel)
      }
    )
  }

  render() {
    let style = merge(styles, this.props.style)

    return (
      <TGroup style={style.group} label={'Госпитализация'}>
        <Ref
          style={style.component}
          table={'ref_hosp'}
          name={'hospId'}
          value={this.state.data.hospId}
          label={'Стационар:'}
          placeholder='-'
          onChange={this.handleChange}
        />

        <Ref
          style={style.component}
          table={'ref_hosp_dep'}
          name={'depId'}
          value={this.state.data.depId}
          label={'Отделение:'}
          placeholder='-'
          onChange={this.handleChange}
        />

        <Ref
          style={style.component}
          table={'ref_help_way'}
          name={'wayId'}
          value={this.state.data.wayId}
          label={'Способ госпитализации:'}
          placeholder='-'
          onChange={this.handleChange}
        />

        <Ref
          style={style.component}
          table={'ref_help_delivery'}
          name={'deliveryId'}
          value={this.state.data.deliveryId}
          label={'Способ доставки в автомобиль:'}
          placeholder='-'
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='listNumber'
          label='№ сопроводительного листа:'
          placeholder='*'
          value={this.state.data.listNumber}
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='hospCode'
          label='ЦКГ:'
          placeholder='*'
          value={this.state.data.hospCode}
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='timeIllBegin'
          label='Время от начала заболевания:'
          placeholder='час'
          value={this.state.data.timeIllBegin}
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='timeVisitPolic'
          label='Время от обращения в ЛПУ:'
          placeholder='час'
          value={this.state.data.timeVisitPolic}
          onChange={this.handleChange}
        />

        <TText
          style={style.component}
          name='timeVisitOsmp'
          label='Время от обращения в ОСМП:'
          placeholder='час'
          value={this.state.data.timeVisitOsmp}
          onChange={this.handleChange}
        />

        <MetaData
          style={style}
          nested={true}
          data={this.state.data.meta}
          name={'meta'}
          onChange={this.handleChange}
          caption={''}
        />
      </TGroup>
    )
  }
}

Hospitalization.propTypes = {
  data: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Hospitalization
