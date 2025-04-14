import React from 'react'
import styles from './styles'
import { MdClear } from 'react-icons/md'

export const ModalBox = props => {
  const items = props.items
  const v = props.v
  console.log(props.list, 'list')
  const handleChange = (event, index) => {
    // обрабатывает изменения в списке и вызывает переданный коллбек onChange, если он есть.
    console.log(event)
    if (props.onClick) {
      props.onClick({
        item: event,
        index: index
      })
    }
  }
  const handleClickMenu = () => {}

  return (
    <div style={styles.modal__main} onClick={props.onClose}>
      <div style={styles.content}>
        <div style={styles.top__test}>
          <h2 style={styles.targetElement}>Выбери пункт</h2>
          <MdClear style={styles.icon} onClick={props.onClose} />
        </div>
        <div style={styles.modal__list}>
          {items.map((item, index) => (
            <div
              key={item.id}
              style={styles.item}
              onClick={() => handleChange(item, index)}>
              {item.name}
            </div>
            // Пример отображения
          ))}
        </div>
      </div>
    </div>
  )
}
