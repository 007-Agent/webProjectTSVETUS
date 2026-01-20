import { templates } from 'styles'
const isMobile = window.innerWidth <= 600
const getStyles = () => {
  return {
    container: {
      display: 'flex',
      flexWrap: isMobile ? 'none' : 'no-wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '16px 0 16px 0',
      fontSize: '20px',
      height: '36px',
      padding: isMobile ? '5px' : '2px',
      fontSize: isMobile ? '14px' : '18px',
      border: isMobile ? '2px solid rgb(189, 149, 133) ' : 'none',
      borderRaduis: isMobile ? '5px ' : 'none',
      borderBottom: isMobile
        ? '2px solid rgb(189, 149, 133) '
        : '1px solid rgb(189, 149, 133)'
    },
    box: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '16px 0px',

      gap: isMobile ? '0 7px' : '0 25px'
    },
    date: {
      color: 'rgb(189, 122, 81)'
    },
    time: {
      color: 'rgb(189, 122, 81)'
    },
    doctor: {
      fontStyle: 'italic',

      fontFamily: 'Arial',
      fontSize: '18px',
      fontSize: isMobile ? '14px' : '18px',
      paddingLeft: isMobile ? '10px' : '30px'
    },
    room: {
      fontStyle: 'italic',
      margin: '0 8px 0 0',
      display: isMobile ? 'none' : 'inline'
    },
    expired: {
      opacity: '0.5'
    },

    active: {
      opacity: '1',
      border: templates.borders.light,
      borderRadius: '4px',
      padding: '8px'
    },

    // box: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   alignItems: 'center',
    //   justifyContent: 'flex-start'
    // },

    // date: {
    //   color: templates.colors.border,
    //   margin: '0 8px 0 0',
    //   color: 'black'
    // },

    // time: {
    //   color: templates.colors.border,
    //   margin: '0 8px 0 0'
    // },

    // doctor: {
    //   margin: '0 8px 0 0'
    // },

    speciality: {
      fontStyle: 'italic',
      fontSize: '14px',
      fontWeight: 600
    },

    // room: {
    //   fontStyle: 'italic',
    //   margin: '0 8px 0 0'
    // },

    // cancel: {
    //   container: {
    //     justifySelf: 'flex-end',
    //     borderRadius: '4px',
    //     ...templates.fonts.xSmall,
    //     padding: '4px'
    //   }
    // },
    canceled: {
      cursor: 'pointer',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3px',
      backgroundColor: 'rgba(248, 240, 126, 0.35)',
      color: 'rgb(0, 0, 0)',
      borderRadius: '4px',
      textAlign: 'center',
      border: '1px solid rgb(46, 18, 7)',
      fontFamily: 'Arial',
      fontSize: isMobile ? '10px' : '18px',
      justifySelf: 'flex-end'
    },
    icon: {
      width: isMobile ? '12px' : '25px',
      height: isMobile ? '12px' : '25px',
      cursor: 'pointer'
    }
  }
}
let styles = getStyles()

// Добавьте обработчик события для изменения размера окна
window.addEventListener('resize', () => {
  styles = getStyles()
})

export default styles
