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

  nested: {
    content: {
      padding: '0',
      border: 'none'
    }
  },

  show: {
    width: '100%',
    textAlign: 'center',
    color: templates.colors.border
  }
}
