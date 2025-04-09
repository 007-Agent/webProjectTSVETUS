import { templates } from 'styles'

const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isMobile840 = window.innerWidth <= 960
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: isMobile840 ? '750px' : '900px',
      margin: '0 auto'
    },

    ward: {
      display: 'flex',
      justifyContent: 'center',
      color: templates.colors.border,
      ...templates.fonts.common
    },

    type: {
      display: 'flex',
      justifyContent: 'center',
      color: templates.colors.border,
      ...templates.fonts.common
    },

    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      margin: '8px 0 0 0',
      color: templates.colors.border,
      ...templates.fonts.common
    },

    age: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '8px 0 0 0',
      width: '100%',
      textAlign: 'right',
      color: templates.colors.border,
      ...templates.fonts.small
    },

    finance: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '8px 0 0 0',
      width: '100%',
      textAlign: 'right',
      color: templates.colors.border,
      ...templates.fonts.small
    },

    nib: {
      display: 'flex',
      justifyContent: 'center',
      color: templates.colors.text,
      ...templates.fonts.common
    },

    fio: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      color: templates.colors.text,
      ...templates.fonts.common
    },

    allergy: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '8px 0 0 0',
      width: '100%',
      textAlign: 'right',
      color: templates.colors.text,
      ...templates.fonts.common
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
