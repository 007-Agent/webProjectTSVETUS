import React from 'react'
import styles from './styles'
export const ModalChange = props => {
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

  return (
    <div style={styles.modal__main}>
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
  )
}
