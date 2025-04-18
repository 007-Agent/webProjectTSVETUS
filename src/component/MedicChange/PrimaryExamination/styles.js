const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isWidth = window.innerWidth <= 960
  return {
    primaryMain: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: isWidth ? '800px' : '930px',
      margin: '0 auto',
      border: '2px solid rgba(108, 167, 176, 0.5)',
      flex: '1 1 0%',
      borderRadius: '8px 22px 22px 8px',
      padding: '10px',
      fontFamily: 'Arial',
      marginTop: '15px'
    },

    titleContent: {
      fontSize: '24px',
      fontStyle: 'italic',
      color: 'rgb(134, 40, 12)',
      marginBottom: '15px',
      boxSizing: 'border-box', // Можете оставить для общего стиля
      cursor: 'default',
      border: 'none',
      outline: 'none',
      textAlign: 'left',
      fontFamily: 'Arial',
      display: 'inline',
      opacity: 1,
      zIndex: 1
    },
    text__content: {
      display: 'flex',
      fontSize: '24px',

      marginTop: '10px',
      fontStyle: 'italic',
      color: 'rgb(134, 40, 12)',
      paddingLeft: '15px',

      marginBottom: '-10px'
    },

    buttonForm: {
      display: 'flex',
      gap: '0 20px',
      marginBottom: '20px',
      paddingLeft: '10px',
      paddingTop: '15px',
      justifyContent: 'center'
    },

    button: {
      cursor: 'pointer',
      userSelect: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isWidth ? '10px 10px' : '16px 19px',
      backgroundColor: 'rgb(108, 167, 176)',
      color: 'rgb(255, 255, 255)',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      opacity: 1
    },

    primaryContent: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px',
      position: 'relative'
    },
    button__save: {
      cursor: 'pointer',
      userSelect: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 9px',
      backgroundColor: 'rgb(108, 167, 176)',
      color: 'rgb(255, 255, 255)',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      fontFamily: 'Arial',
      fontSize: '22px',
      opacity: 1,
      width: '138px',
      marginLeft: '15px'
    },
    content__up: {
      // display: 'flex',

      // justifyContent: 'space-between',
      // alignItems: 'center',
      position: 'relative'
    },
    marker: {
      position: 'absolute',
      right: '132px',
      bottom: '-76px',
      cursor: 'pointer',
      width: '46px',
      height: '46px',
      color: 'rgb(108, 167, 176)'
    },
    saving: {
      fontSize: '24px',
      fontStyle: 'italic',
      color: 'rgb(134, 40, 12)',

      boxSizing: 'border-box', // Можете оставить для общего стиля
      cursor: 'default',
      border: 'none',
      outline: 'none',
      textAlign: 'left',
      fontFamily: 'Arial',
      display: 'inline',
      opacity: 1,
      zIndex: 1
    },
    result__save: {
      display: 'flex',
      alignItems: 'center',
      gap: '0 30px'
    }
  }
}
// Вызовите функцию один раз при загрузке
const styles = getStyles()

// Добавьте обработчик события для изменения размера окна
window.addEventListener('resize', () => {
  styles = getStyles()
})

export default styles
