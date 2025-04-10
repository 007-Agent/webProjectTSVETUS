import { templates } from 'styles'

const getStyles = () => {
  const isMobile = window.innerWidth <= 800
  const isMobile840 = window.innerWidth <= 960
  return {
    modal__main: {
      position: 'fixed',
      zIndex: 30,
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transitionProperty: 'background-color',
      transitionDuration: '250ms',
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center'
    },
    modal__list: {
      display: 'flex',
      flexDirection: 'column',
       gap: '5px 0',
      overflowY: 'auto' // Вертикальная прокрутка
    },
    item: {
      cursor: 'pointer',

      padding: '7px 0', // Учитываем, что padding задан дважды, оставляем только нужный
      borderBottom: '1px solid red',
      border: '1px solid #9d9d9d',
      borderRadius: '5px',
      fontSize: '25px',
      fontFamily: 'Arial'
    },
    content: {
      position: 'absolute',
      top: '50%', // Центрируем по вертикали
      left: '50%', // Центрируем по горизонтали
      transform: 'translate(-50%, -50%)', // Центрируем
      display: 'flex',
      flexDirection: 'column',
      gap: '30px', // Отступы между элементами
      maxHeight: '80%', // Ограничиваем максимальную высоту
      overflowY: 'auto', // Вертикальная прокрутка
      border: '1px solid #ccc', // Для визуального разделения
      padding: '10px',
      backgroundColor: 'rgb(209, 214, 220',
      width: '500px'
    },
    top__test: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '30px'
    },
    targetElement: {
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
    icon : {
      width: '40px',
      height: '40px',
      cursor: 'pointer',
     
      color: 'rgb(108, 167, 176)',
      
      
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
