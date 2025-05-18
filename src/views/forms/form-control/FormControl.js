import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const FormControl = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cell_number: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('http://localhost:8000/api/profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          cell_number: formData.cell_number,
          password: formData.password
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setSubmitMessage('User created successfully!')
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        cell_number: '',
        password: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitMessage(`Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sign up form</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Full name:</CFormLabel>
                <CFormTextarea 
                  id="name" 
                  placeholder="John Doe" 
                  rows={1}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email address:</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="cell_number">Cell number:</CFormLabel>
                <CFormTextarea 
                  id="cell_number" 
                  placeholder="0781234567" 
                  rows={1}
                  value={formData.cell_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="password">Password:</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <CButton 
                shape="rounded-pill" 
                type="submit" 
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </CButton>
              {submitMessage && (
                <div className={`mt-3 alert ${submitMessage.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                  {submitMessage}
                </div>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl



// import React from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormInput,
//   CFormLabel,
//   CFormTextarea,
//   CRow,
// } from '@coreui/react'
// import { DocsComponents, DocsExample } from 'src/components'

// const FormControl = () => {
//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>Sign up form</strong>
//           </CCardHeader>
//           <CCardBody>
//             <DocsExample href="forms/form-control">
//               <CForm>
//               <div className="mb-3">
//                   <CFormLabel htmlFor="exampleFormControlTextarea1">Full name:</CFormLabel>
//                   <CFormTextarea id="exampleFormControlTextarea1" placeholder="John Doe" rows={1}></CFormTextarea>
//                 </div>
//                 <div className="mb-3">
//                   <CFormLabel htmlFor="exampleFormControlInput1">Email address:</CFormLabel>
//                   <CFormInput
//                     type="email"
//                     id="exampleFormControlInput1"
//                     placeholder="name@example.com"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <CFormLabel htmlFor="exampleFormControlTextarea1">Cell number:</CFormLabel>
//                   <CFormTextarea id="exampleFormControlTextarea1" placeholder="0781234567" rows={1}></CFormTextarea>
//                 </div>

//                 <div className="mb-3">
//                   <CFormLabel htmlFor="inputPassword">Password:</CFormLabel>
//                   <CFormInput
//                     type="password"  // This makes input appear as dots/asterisks
//                     id="inputPassword"
//                     placeholder="Enter password"
//                   />
//                 </div>

//               </CForm>
//               <CButton shape="rounded-pill" type="submit" color="primary">
//                 Submit
//               </CButton>
//             </DocsExample>
//           </CCardBody>
//         </CCard>
//       </CCol>
      
      
      
//       {/* <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>
//             <strong>React Form Control</strong> <small>File input</small>
//           </CCardHeader>
//           <CCardBody>
//             <DocsExample href="forms/form-control#file-input">
//               <div className="mb-3">
//                 <CFormLabel htmlFor="formFile">Default file input example</CFormLabel>
//                 <CFormInput type="file" id="formFile" />
//               </div>
//               <div className="mb-3">
//                 <CFormLabel htmlFor="formFileMultiple">Multiple files input example</CFormLabel>
//                 <CFormInput type="file" id="formFileMultiple" multiple />
//               </div>
//             </DocsExample>
//           </CCardBody>
//         </CCard>
//       </CCol> */}

//     </CRow>
//   )
// }

// export default FormControl
