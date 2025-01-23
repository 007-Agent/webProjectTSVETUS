import { templates } from 'styles'

const container = {
  margin: '16px 16px 16px 0',
  width: '150px',
  borderBottom: 'none',
  flexShrink: '0'
}

const edit = {
  textAlign: 'right',
  ...templates.fonts.xSmall,
  minHeight: '24px'
}

const label = {
  ...templates.fonts.xSmall
}

export default {
  container: {
    display: 'flex',
    justifyContent: 'flex-start'
  },

  number: {
    container: {
      ...container,
      width: '120px'
    },
    edit: edit,
    label: label
  },

  panel: {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  },

  date: {
    container: {
      width: '200px',
      margin: '0 0 0 16px'
    }
  },

  time: {
    container: {
      width: '80px',
      margin: '0 0 0 16px'
    }
  },

  crew: {
    container: {
      ...container,
      width: '110px'
    },
    edit: edit,
    label: label
  },

  color: {
    container: {
      ...container,
      width: '120px'
    },
    edit: edit,
    label: label
  },

  imei: {
    container: {
      ...container,
      width: '180px'
    },
    edit: edit,
    label: label
  },

  phone: {
    container: {
      ...container,
      width: '140px'
    },
    edit: edit,
    label: label
  },

  type: {
    container: {
      ...container,
      width: '100px'
    },
    edit: edit,
    label: label
  },

  active: {
    container: {
      ...container,
      width: '80px'
    },
    edit: edit,
    label: label
  },

  text: {
    ...container,
    width: '80px',
    color: templates.colors.border,
    textAlign: 'center',
    ...templates.fonts.tiny
  },

  iconSave: {
    margin: '12px',
    width: '24px',
    color: '#3a3',
    cursor: 'pointer'
  },

  iconDelete: {
    margin: '12px',
    width: '24px',
    color: '#ff0000',
    cursor: 'pointer'
  },

  iconPrint: {
    margin: '12px',
    width: '24px',
    cursor: 'pointer'
  }
}
