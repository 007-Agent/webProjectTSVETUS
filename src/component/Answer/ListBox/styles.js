import { templates } from 'styles'

const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isMobile840 = window.innerWidth <= 960
  return {
    list__form: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      border: 'none',
      margin: '8px 0',
      padding: '0',
      width: '100%'
    },
    list__full: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexFlow: 'column wrap',
      padding: '8px',
      border: '1px solid rgba(108, 167, 176, 0.5)',
      flex: '1 1 0%',
      borderRadius: '8px 22px 22px 8px'
    },
    list__title: {
      boxSizing: 'border-box',
      cursor: 'default',
      padding: '4px',
      border: 'none',
      color: 'rgb(108, 167, 176)',
      outline: 'none',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '21px',
      display: 'inline',
      opacity: 1,
      zIndex: 1,
      alignSelf: 'flex-start',
      margin: '0 0 -16px 8px',
      backgroundColor: 'rgb(255, 255, 255)'
    },
    list__check: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '8px 0 0'
    },
    list__change: {
      outline: 'none',
      userSelect: 'none',
      boxSizing: 'border-box',
      width: '100%',
      border: 'none',
      cursor: 'pointer',
      backgroundImage:
        'linear-gradient(to right, rgba(52, 121, 130, 0.15), rgb(255, 255, 255))',
      backgroundColor: 'rgba(52, 121, 130, 0.15)',
      borderRadius: '4px 16px 16px 4px',
      height: 'auto'
    },
    list__tabindex: {
      boxSizing: 'border-box',
      flex: '1 0 0%',
      outline: 'none',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '36px',
      padding: '4px 4px 2px',
      border: 'none',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '24px'
    },
    list__content: {
      display: 'flex',
      flexFlow: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    icon: {
      boxSizing: 'border-box',
      width: '32px',
      height: '32px',
      color: 'green',
      flexShrink: 0,
      flexGrow: 0,
      textAlign: 'right',
      cursor: 'pointer',
      margin: '0 0 0 4px'
    },
    list__text: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '8px 0',
      fontFamily: 'Arial',
      fontSize: '24px',
      textAlign: 'right'
    },
    title: {
      flex: '1 1 auto',
      width: '100%',
      margin: '0 16px 0 0'
    },
    minus: {
      boxSizing: 'border-box',
      width: '32px',
      height: '32px',
      color: 'rgb(221, 34, 34)',

      flexGrow: 0,
      cursor: 'pointer'
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
