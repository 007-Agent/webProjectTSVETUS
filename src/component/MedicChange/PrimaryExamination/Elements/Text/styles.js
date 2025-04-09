const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isWidth = window.innerWidth <= 960
  return {
    primaryForm: {
      display: 'flex',
      flexDirection: 'column',
      border: 'none',
      gap: '5px 0',
      
      paddingLeft: '15px'
    },
    textFrom: {
      boxSizing: 'border-box',
      outline: 'none',
      whiteSpace: 'normal',
      overflow: 'hidden', // Скрывает прокрутку
      height: '38px', // Минимальная высота
      padding: '4px 4px 2px', // Внутренние отступы
      border: '1px solid rgba(108, 167, 176, 0.5)',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
      borderRadius: '5px',
      fontSize: '24px',
      width: '100%', // Ширина
      resize: 'none',
      marginBottom: '5px'
    },
    titlePrimary: {
      boxSizing: 'border-box',
      cursor: 'default',
      padding: '4px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      outline: 'none',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: isWidth ? '18px' : '24px',
      display: 'inline',
      opacity: 1,
      zIndex: 1,
      height: '10px'
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
