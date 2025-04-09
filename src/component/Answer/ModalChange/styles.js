import { templates } from 'styles'

const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isMobile840 = window.innerWidth <= 960
  return {
    modal__main: {
      boxSizing: 'border-box',
      backgroundColor: '#f7f7f7',

      width: '100%',
      borderRadius: '10px',
      zIndex: 999,
      position: 'absolute',
      top: '172px'
    },
    modal__list: {
      display: 'flex',
      flexDirection: 'column',

      fontSize: '21px',
      justifyContent: 'center',
      textAlign: 'center',
      listStyleType: 'none'
    },
    item: {
      cursor: 'pointer',
      width: '100%',
      padding: '7px 0', // Учитываем, что padding задан дважды, оставляем только нужный
      borderBottom: '1px solid red',
      border: '1px solid #9d9d9d',
      borderRadius: '5px'
    }
  }
}
// Вызовите функцию один раз при загрузке
let styles = getStyles()

// Добавьте обработчик события для изменения размера окна
window.addEventListener('resize', () => {
  styles = getStyles()
})

export default styles
