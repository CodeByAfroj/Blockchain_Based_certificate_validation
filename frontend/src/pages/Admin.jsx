import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminDashBoard from '../components/AdminDasBoard'
import { useSelector } from 'react-redux'

const Admin = () => {
  const [certificates, setCertificates] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const darkMode = useSelector((state) => state.theme.darkMode)

  const fetchCertificates = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('http://localhost:5000/issued-certificates')
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
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} min-h-screen`}>
      <AdminDashBoard
        certificates={certificates}
        isLoading={isLoading}
        onRefresh={fetchCertificates}
        darkMode={darkMode} // Pass down darkMode if needed inside AdminDashBoard
      />
    </div>
  )
}

export default Admin
