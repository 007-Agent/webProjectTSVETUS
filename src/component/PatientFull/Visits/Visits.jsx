// import React from 'react'
// import PropTypes from 'prop-types'

// import { TLoad, merge, post } from 'tinput'

// import Visit from './Visit'
// import Appointment from './Appointment'

// import styles from './styles.js'

// class Visits extends React.PureComponent {
//   constructor(props) {
//     super(props)
//     this.state = {
//       items: []
//     }
//     this.refresh = this.refresh.bind(this)
//   }

//   componentDidMount() {
//     this.mounted = true
//     this.refresh()
//   }

//   componentWillUnmount() {
//     this.mounted = false
//   }

//   refresh() {
//     const patientId = this.props.patient?.id || 0
//     if (patientId > 0) {
//       post({
//         url: '/api/visit/list',
//         data: { query: { patientId } },
//         sender: this,
//         target: 'items'
//       })
//     }
//   }

//   render() {
//     let style = merge(styles, this.props.style)

//     let items = this.state.items.map((v, i) => {
//       return (
//         <Visit
//           key={i}
//           style={style.visit}
//           patient={this.props.patient}
//           visit={v}
//           onRefresh={this.refresh}
//         />
//       )
//     })

//     return (
//       <div>
//         <Appointment
//           patient={this.props.patient}
//           specialities={this.props.specialities}
//           user={this.props.user}
//           onRefresh={this.refresh}
//         />
//         {items}
//         <TLoad show={this.state.wait} />
//       </div>
//     )
//   }
// }

// Visits.propTypes = {
//   style: PropTypes.object,
//   patient: PropTypes.object,
//   specialities: PropTypes.array,
//   user: PropTypes.object
// }

// export default Visits

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { TLoad, merge } from 'tinput'

import Visit from './Visit'
import Appointment from './Appointment'

import styles from './styles.js'

const Visits = ({ patient, specialities, user, style }) => {
  const [items, setItems] = useState([])
  const [wait, setWait] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 1
  const isMounted = useRef(true)

  const fetchVisits = () => {
    const patientId = patient?.id || 0
    if (patientId > 0) {
      setWait(true)
      axios
        .post('/api/visit/list', { query: { patientId } })
        .then(response => {
          if (isMounted.current) {
            setItems(response.data.data)
            setWait(false)
            setCurrentPage(1) // при загрузке сбрасываем страницу на первую
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setWait(false)
          }
        })
    }
  }

  useEffect(() => {
    isMounted.current = true
    fetchVisits()
    return () => {
      isMounted.current = false
    }
  }, [patient]) // при изменении patient перезагружаем визиты

  const combinedStyle = merge(styles, style)

  const visitItems = items
    .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
    .map((v, i) => (
      <Visit
        key={i}
        style={combinedStyle.visit}
        patient={patient}
        visit={v}
        onRefresh={fetchVisits}
      />
    ))

  const totalPages = Math.ceil(items.length / clientsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div>
      <Appointment
        patient={patient}
        specialities={specialities}
        user={user}
        onRefresh={fetchVisits}
      />
      {visitItems}

      <div style={styles.button_content}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={styles.button}>
          ← Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
          style={styles.button}
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}>
          Следующая →
        </button>
      </div>
      <TLoad show={wait} />
    </div>
  )
}

export default Visits
