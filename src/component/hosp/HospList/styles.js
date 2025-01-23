export default {
  container: {},

  panel: {
    container: {
      display: 'flex',
      flexDirection: 'column'
    }
  },

  params: {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      width: '100%'
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
