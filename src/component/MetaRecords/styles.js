import { templates } from 'styles'

export default {
  group: {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flex: '1',
      padding: '16px'
    }
  },

  iconAdd: {
    container: {
      cursor: 'pointer'
    }
  },

  add: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },

  show: {
    width: '100%',
    textAlign: 'center',
    color: templates.colors.border
  }
}
