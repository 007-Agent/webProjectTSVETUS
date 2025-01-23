import React from 'react'
import PropTypes from 'prop-types'

import {
  TSearch,
  TText,
  TListBox,
  TModal,
  clone,
  merge,
  post,
  compare
} from 'tinput'

import Ref from 'component/Ref'
import ListRef from 'component/ListRef'
import Department from 'component/Department'
import Expense from './Expense'
import styles from './styles.js'

class Service extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      expenses: [],
      showPayReason: false
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getExpenses = this.getExpenses.bind(this)
    this.materialAdd = this.materialAdd.bind(this)
    this.getItems = this.getItems.bind(this)
    this.expenseChange = this.expenseChange.bind(this)
    this.closePayReason = this.closePayReason.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    let srv = this.props.service
    if (srv && srv.code) {
      this.getExpenses(srv.code)
    }
  }

  componentWillUnmount() {
    this.mounted = false
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !compare(this.props.service, nextProps.service) ||
      !compare(this.props.params, nextProps.params) ||
      !compare(this.props.index, nextProps.index) ||
      !compare(this.state.expenses, nextState.expenses)
    )
  }

  getItems() {
    return this.state.expenses.map((v, i) => {
      return { id: i, name: v.material.name }
    })
  }

  expenseChange(event) {
    let service = clone(this.props.service)
    service.expenses[event.index] = event.expense
    this.props.onChange({
      service: service,
      index: this.props.index
    })
  }

  materialAdd(event) {
    let service = clone(this.props.service)
    let id = event.item.id
    if (id >= 0) {
      let expense = this.state.expenses[id]
      if (service.expenses) {
        service.expenses.push(expense)
      } else {
        service.expenses = [expense]
      }
      this.props.onChange({
        service: service,
        index: this.props.index
      })
    }
  }

  handleChange(event) {
    if (event.name === 'service') {
      let query = {
        ...this.props.params,
        code: event.value
      }
      post({
        url: '/rest/pol/service',
        data: query,
        success: service => {
          if (service && service.departmentId <= 0) {
            service.departmentId = this.props.params.departmentId
          }
          if (
            service &&
            (!service.diagnosisCode || service.diagnosisCode.trim() === '')
          ) {
            service.diagnosisCode = this.props.params.diagnosisCode
          }
          if (this.mounted) {
            this.props.onChange({
              service: service,
              index: this.props.index
            })
          }
        }
      })
    } else if (event.name === 'department') {
      if (event.value && event.value > 0) {
        let service = {
          ...this.props.service,
          departmentId: event.value
        }
        this.props.onChange({
          service: service,
          index: this.props.index
        })
      }
    } else if (event.name === 'payId') {
      let service = {
        ...this.props.service,
        [event.name]: event.value
      }
      this.props.onChange({
        service: service,
        index: this.props.index
      })
      this.setState({
        showPayReason: event.value !== this.props.service?.defPayId
      })
    } else if (event.name === 'changeReasonId') {
      let service = {
        ...this.props.service,
        [event.name]: event.value
      }
      this.props.onChange({
        service: service,
        index: this.props.index
      })
      if (this.state.showPayReason) {
        this.setState({ showPayReason: false })
      }
    } else {
      let service = {
        ...this.props.service,
        [event.name]: event.value
      }
      this.props.onChange({
        service: service,
        index: this.props.index
      })
    }
  }

  handleSearch(event, callback) {
    let query = {
      code: event.key,
      name: event.value
    }
    post({
      url: '/rest/pol/tarifs',
      data: query,
      success: response => {
        if (this.mounted) {
          callback(response)
        }
      }
    })
  }

  getExpenses(code) {
    post({
      url: '/rest/pol/expenses',
      data: { code: code },
      success: expenses => {
        if (this.mounted) {
          this.setState({ expenses: expenses })
        }
      }
    })
  }

  closePayReason() {
    this.setState({ showPayReason: false })
  }

  render() {
    let style = merge(styles, this.props.style)
    let service = this.props.service ? this.props.service : {}

    let info = null
    if (!this.props.hideInfo) {
      info = (
        <div style={style.box}>
          {service.payId != service.defPayId && (
            <Ref
              style={style.reason}
              table={'ref_change_reason'}
              placeholder={'Причина изменения:'}
              value={service.changeReasonId}
              onChange={this.handleChange}
              name={'changeReasonId'}
            />
          )}

          <Ref
            style={style.pay}
            table={'ref_vid_opl'}
            placeholder={'Вид опл:'}
            value={service.payId}
            onChange={this.handleChange}
            name={'payId'}
          />

          <TText
            style={style.count}
            onChange={this.handleChange}
            name={'count'}
            value={service.count}
            placeholder={'Кол.'}
          />

          <div style={style.text}>*</div>

          <TText
            style={style.cost}
            onChange={this.handleChange}
            name={'fullCost'}
            value={service.fullCost}
            placeholder={'Цена'}
          />

          <div style={style.text}>руб.</div>
        </div>
      )
    }

    let expenses = null
    if (
      !this.props.hideExp &&
      this.props.service &&
      this.props.service.expenses
    ) {
      expenses = this.props.service.expenses.map((v, i) => {
        return (
          <Expense
            key={i}
            expense={v}
            index={i}
            onChange={this.expenseChange}
          />
        )
      })
    }

    let material = null
    if (!this.props.hideExp && this.state.expenses.length > 0) {
      material = (
        <TListBox
          style={style.material}
          name={'materials'}
          label={'Расходный материал'}
          caption={'Расходный материал'}
          empty={{ id: -1, name: '-' }}
          value={null}
          showIcon={false}
          modal={5}
          keyField={'id'}
          valueField={'name'}
          showEdit={false}
          onChange={this.materialAdd}
          items={this.getItems()}
        />
      )
    }

    let department = null
    if (this.props.showDep) {
      department = (
        <Department
          style={style.department}
          layout={'top'}
          name={'department'}
          value={service.departmentId}
          label={'Направляется в:'}
          placeholder={'Выберите отделение'}
          showIcon={false}
          onChange={this.handleChange}
        />
      )
    }

    let code = this.props.service ? this.props.service.code : null

    return (
      <div style={style.container}>
        <TSearch
          style={style.service}
          name={'service'}
          placeholder={
            this.props.placeholder ? this.props.placeholder : 'Код / название'
          }
          showButton={false}
          value={code}
          keyField={'code'}
          valueField={'name'}
          showIcon={false}
          showMode={'key value'}
          listMode={'key value'}
          readOnly={this.props.readOnly}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
        />

        {info}

        {expenses}

        {material}

        {department}

        <TModal
          name={'reason'}
          caption={'Выберите причину смены вида оплаты'}
          style={style.reason?.modal}
          show={this.state.showPayReason}
          onClose={this.closePayReason}>
          <ListRef
            name={'changeReasonId'}
            style={style.reason?.list}
            table={'ref_change_reason'}
            onChange={this.handleChange}
          />
        </TModal>
      </div>
    )
  }
}

Service.propTypes = {
  service: PropTypes.object,
  params: PropTypes.object,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hideInfo: PropTypes.any,
  index: PropTypes.number,
  hideExp: PropTypes.any,
  showDep: PropTypes.any,
  readOnly: PropTypes.any
}

export default Service
