import React, { useState } from 'react'

import { merge, clone, post, strDate, cutTime, TDate, TText } from 'tinput'
import axios from 'axios'
import styles from './styles.js'

export const TempItem = props => {
  const values = props.value
  console.log(values, 'КАКОЕ значение передали')
  const obj = JSON.parse(values?.data?.list?.[0]?.name)
  console.log(obj, 'object')
  const object = JSON.parse(props.value?.data?.list?.[0]?.name)
  console.log(object, 'Odttrtrtrtrrt')
  console.log(obj.text, 'OOOBBBBJECT')
  const style = merge(styles, props.style)
  const [result, setResult] = useState(props.value)
  const [text, setText] = useState()
  const [isTextModified, setIsTextModified] = useState(false)

  function handleChange(event) {
    setIsTextModified(true)
    const value = values
    const obj = JSON.parse(value?.data?.list?.[0].name)
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
    // value.data.list[0].name =  newRecord
    setResult(value)
    console.log(values, 'Values efiwefnuiwenfuiwebnfweuibfwuifbwe')
  }
  function save() {
    axios
      .post(`/rest/${props.project}/${props.name}/update`, {
        data: [result]
      })
      .then(response => {
        // Обработка успешного ответа

        console.log(response, 'res')
      })
  }
  function HandleInfoDelete(event) {
    if (props.onDelete) {
      props.onDelete({ key: event.key })
    }
  }
  return (
    <div style={style.container}>
      <div style={style.row}>
        <div style={style.left}>
          <TDate
            style={style.date}
            name={'date'}
            value={obj.date}
            onChange={handleChange}
          />
          <TText
            style={style.day}
            name={'day'}
            value={obj.day}
            regexp={TText.regexp.number}
            label={'День болезни:'}
            required={'never'}
            onChange={handleChange}
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
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'evTemp'}
                value={obj.evTemp}
                regexp={TText.regexp.float}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'moArtPress'}
                value={obj.moArtPress}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'evArtPress'}
                value={obj.evArtPress}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'moPulse'}
                value={obj.moPulse}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'evPulse'}
                value={obj.evPulse}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'weight'}
                value={obj.weight}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'liquid'}
                value={obj.liquid}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'water'}
                value={obj.water}
                regexp={TText.regexp.number}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'enuresis'}
                value={obj.enuresis}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'stool'}
                value={obj.stool}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'bath'}
                value={obj.bath}
                required={'never'}
                onChange={handleChange}
              />
            </td>
            <td style={style.table.data}>
              <TText
                style={style.param}
                name={'pediculosis'}
                value={obj.pediculosis}
                required={'never'}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={style.buttonList}>
      {isTextModified && ( // Проверяем, изменился ли текст и есть ли текст в поле
        <button onClick={save} style={style.click__save}>
          Сохранить
        </button>
      )}
      {isTextModified &&
        text !== '' && ( // Проверяем, изменился ли текст и есть ли текст в поле
          <button onClick={HandleInfoDelete} style={style.click__save}>
            Отмена
          </button>
        )}
      </div>
      
    </div>
  )
}

export default TempItem
