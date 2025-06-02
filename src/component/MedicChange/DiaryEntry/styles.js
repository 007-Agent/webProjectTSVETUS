const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isMobile840 = window.innerWidth <= 960
  return {
    title: {
      display: 'flex',
      justifyContent: 'center',
      color: 'rgb(108, 167, 176)',
      fontFamily: 'Arial',
      fontSize: '30px',
      marginBottom: '30px'
    },
    diary__main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: isMobile840 ? '865px' : '900px',

      margin: '0 auto'
    },
    targetElement: {
      // Changed the key to a generic name, but you can rename it appropriately.
     
      padding: '4px 4px 2px',
     
      color: 'black',
      textAlign: 'left',
      fontFamily: 'Arial',
      fontSize: '22px'
    },
    diary__table: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'column wrap',
      padding: '16px',
      border: '1px solid rgb(108, 167, 176)',
      flex: '1 1 0%',
      borderRadius: '8px',
      minHeight: '50px',
      maxWidth: isMobile840 && '750px',
      margin: isMobile840 && '0 auto'
    },
    diary__plus: {
      display: 'flex',
      justifyContent: 'right',
      width: '35px',
      height: '35px',
      color: 'rgb(108, 167, 176)',
      cursor: 'pointer',
      right: '10px'
    },
    plus: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
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
