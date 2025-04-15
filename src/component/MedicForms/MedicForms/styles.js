const getStyles = () => {
  const isMobile = window.innerWidth <= 800

  return {
    content: {},
    list: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: isMobile ? '20px 50px' : '0 50px',
      listStyleType: 'none',
      color: 'rgb(108, 167, 176)',
      fontSize: '24px', // Адаптивный размер шрифта для списка
      cursor: 'pointer',
      justifyContent: 'center',

      flexWrap: isMobile ? 'wrap' : 'row'
    },
    list__medform: {
      display: 'flex',
      justifyContent: 'center', // Убедитесь, что это значение вам действительно нужно
      gap: '0 50px',
      listStyleType: 'none',
      color: 'rgb(108, 167, 176)',
      fontSize: '24px',
      cursor: 'pointer',
      marginBottom: '65px',
      backgroundImage:
        'linear-gradient(rgb(209, 214, 220), rgb(255, 255, 255))',
      paddingTop: '50px',
      alignItems: 'center',
      fontFamily: 'Arial'
    },
    mediccontent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage:
        'linear-gradient(rgb(209, 214, 220), rgb(255, 255, 255))',
      color: 'rgb(108, 167, 176)',
      fontFamily: 'Arial',
      fontSize: isMobile ? '16px' : '24px', // Адаптивный размер шрифта для содержимого
      padding: '16px'
    },
    fioName: {
      cursor: 'default',
      padding: '4px 8px 0px 0px',
      border: 'none',
      color: 'rgb(134, 40, 12)',
      outline: 'none',
      textAlign: 'center',

      fontSize: '25px'
    },
    medslider: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '100px',
      fontSize: isMobile ? '30px' : '50px' // Адаптивный размер шрифта для слайдера
    },
    Link: {
      border: isMobile && '2px solid black',
      padding: isMobile && '5px',
      borderRadius: isMobile && '10px'
    },
    button_content: {
      display: 'flex',
      zIndex: '999',
      backgroundColor: 'rgb(209, 214, 220)',
      justifyContent: 'center',
      gap: '0 100px',
      paddingTop: '50px'
    },
    icon: {
      width: '58px',
      height: '58px',
      cursor: 'pointer',
      float: 'left',
      color: 'rgb(108, 167, 176)',
      position: 'absolute',
      right: isMobile ? '10px' : '80px',
      top: isMobile && '-45px'
    },
    select__type: {
      boxSizing: 'border-box',
      flex: '1 0 0%',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '36px',
      padding: '4px 4px 2px',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '24px',
      maxWidth: '400px',
      height: '36px'
    },
    main__form: {
      position: 'relative',
      marginBottom: '100px'
    },
    outline__info: {
      color: 'brown',
      fontSize: '40px',
      textAlign: 'center',
      right: '80px'
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
