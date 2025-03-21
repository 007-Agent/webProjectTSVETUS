export default {
  root: {
    position: 'relative'
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    height: '36px'
  },
  icon: {
    width: '30px',
    height: '30px',
    opacity: 0.5,
    position: 'absolute',
    left: '125px',
    top: '87px'
  },
  input: {
    width: '300px',
    fontSize: '24px',
    paddingLeft: '40px',
    transition: 'all 0.15s ease-in-out',
    border: '1px solid rgba(108, 167, 176, 0.5)',
    minHeight: '36px',
    outline: 'none', // Убираем обводку
    whiteSpace: 'nowrap', // Запрет на перенос строк
    overflow: 'hidden',
    outline: 'none',
    whiteSpace: 'nowrap',
    color: 'rgb(0, 0, 0)',
    padding: '0px 4px 0px 40px',
    background: 'transparent' /* Делаем фон прозрачным */

    // inputFocus: {
    //   border: '1px solid rgba(0, 0, 0, 0.2)',
    // },
  },
  clear: {
    width: '45px',
    height: '45px',
    cursor: 'pointer'
  }
}
