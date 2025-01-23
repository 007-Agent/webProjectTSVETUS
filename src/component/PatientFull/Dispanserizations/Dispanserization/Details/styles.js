import { templates } from 'styles'

export default {
  list: {
    container: {
      width: '100%',
      margin: '12px 0 0 0'
    },
    content: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    frame: {
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #aaa',
      margin: '8px',
      padding: '16px',
      border: templates.borders.light,
      borderRadius: '16px'
    },
    field: {
      color: templates.colors.border,
      float: 'left',
      marginRight: '2px'
    },
    value: {
      fontStyle: 'italic'
    },
    col: { width: '100%', textAlign: 'left' }
  }
}
