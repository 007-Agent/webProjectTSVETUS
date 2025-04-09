const getStyles = () => {
  const isMobile = window.innerWidth <= 800

  return {
    record__main: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      marginBottom: '20px'
    },
    record__input: {
      boxSizing: 'border-box',
      flex: '1 0 0%',
      outline: 'none',
      whiteSpace: 'normal',
      overflow: 'hidden',
      height: '38px',
      padding: '4px 4px 2px',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '22px',
      width: '100%'
    },
    record__date: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '36px'
    },
    title__h: {
      boxSizing: 'border-box',
      flex: '1 0 0%',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '0px',
      padding: '4px 4px 2px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '22px'
    },
    span: {
      boxSizing: 'border-box',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      padding: '4px 4px 2px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      textAlign: 'left',
      fontSize: '22px'
    },
    button: {
      cursor: 'pointer',
      userSelect: 'none',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px 14px',
      backgroundColor: 'rgb(108, 167, 176)',
      color: 'rgb(255, 255, 255)',
      borderRadius: '8px',
      textAlign: 'center',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      fontFamily: 'Arial',
      fontSize: '18px',
      opacity: '1',
      width: '140px'
    },
    targetElement: {
      // Changed the key to a generic name, but you can rename it appropriately.
      boxSizing: 'border-box',
      flex: '1 0 0%',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '0px',
      padding: '4px 4px 2px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '22px'
    },
    span: {
      // Rename this appropriately
      boxSizing: 'border-box',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      padding: '4px 4px 2px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      textAlign: 'left',
      fontSize: '22px'
    },
    buttonInfo: {
      display: 'flex',

      alignItems: 'center',
      gap: '0 30px',
      marginTop: '20px'
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
