export default {
  container: {},

  panel: {
    container: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  patientinfo: {},

  params: {
    container: {
      display: 'flex',
      textAlign: 'right',
      justifyContent: 'space-between',
      alignUtems: 'center',
      padding: '0 100px'
    },
    type: {
      container: {
        margin: '0 0 0 16px',
        width: '400px',
        borderBottom: 'none'
      }
    }
  },

  pager: {
    container: {
      margin: '16px 0 0 0'
    }
  },

  scroll: {},

  mainpatient: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxHeight: '750px', // Установите максимальную высоту
    overflowY: 'auto', // Включите вертикальную прокрутку
    border: '1px solid #ccc', // Опционально: добавьте границу
    padding: '10px', // Опционально: добавьте отступы
    borderTop: 'none',
    borderLeft: 'none'
  },

  ribbon: {
    container: {
      width: '100%'
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    frame: {
      display: 'flex',
      flexDirection: 'column',
      width: '520px',
      margin: '8px',
      borderRadius: '16px',
      border: '1px solid red',
      padding: '8px'
    }
  }
}
