import React, { useState, useEffect } from 'react'
import axios from 'axios'
import  AdminDashBoard from '../components/AdminDasBoard'

const Admin = () => {
  const [certificates, setCertificates] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCertificates = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('http://localhost:5000/issued-certificates')
      // ensure we’re using the correct data structure
      setCertificates(res.data.certificates || [])
    } catch (err) {
      console.error('Error fetching certificates:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  return (
    <>
      <AdminDashBoard
        certificates={certificates}
        isLoading={isLoading}
        onRefresh={fetchCertificates}
      />
    </>
  )
}

export default Admin
