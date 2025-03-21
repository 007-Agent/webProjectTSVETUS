import { templates } from 'styles'
const getStyles = () => {
  const isMobile = window.innerWidth <= 800

  return {
     
    title: {
      display: 'flex',
      justifyContent: 'center',
      color: 'rgb(108, 167, 176)',
      textAlign: 'center',
      fontFamily: 'Arial',
      fontSize: isMobile ? '25px' : '30px',
      marginBottom: '30px',
      
    },
    diary__temp: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: isMobile ? '764px' : '1100px',

      margin: '0 auto'
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
      minHeight: '50px'
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
