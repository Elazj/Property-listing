// File: src/pages/PropertyDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchPropertyById } from '../utils/api'

export default function PropertyDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState(null)
  const [error, setError] = useState(null)
  const [index, setIndex] = useState(0)

  useEffect(()=>{
    let mounted = true
    fetchPropertyById(id).then(res=>{
      if (!mounted) return
      if (res.ok) setItem(res.data)
      else setError(res.error)
      setLoading(false)
    })
    return ()=>{ mounted=false }
  }, [id])

  if (loading) return <div className="container">Loading property...</div>
  if (error || !item) return <div className="container">Property not found.</div>


return (
  <div className="container mt-6">
    <div className="bg-white border rounded-lg p-4 grid md:grid-cols-2 gap-6">
      <div>
        <img src={item.images[index]} alt={`${item.title} ${index+1}`} className="w-full h-72 object-cover rounded" />
        {item.images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {item.images.map((img,i)=>(
              <button key={i} onClick={()=>setIndex(i)} className={`w-16 h-12 overflow-hidden rounded ${i===index ? 'ring-2 ring-accent' : ''}`}>
                <img src={img} alt={`thumb ${i+1}`} className="w-full h-full object-cover"/>
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <div className="text-sm text-gray-600 mt-1">Location: {item.location} • {item.beds} beds • {item.baths} baths</div>
        <div className="text-xl font-bold text-accent mt-3">GMD {item.price.toLocaleString()}</div>
        <p className="mt-4 text-gray-700">{item.description}</p>
        <div className="text-sm text-gray-500 mt-4">Listed: {new Date(item.listedAt).toLocaleDateString()}</div>
        <div className="mt-4">
          <a href="/properties" className="px-3 py-2 bg-gray-200 rounded">Back to listings</a>
        </div>
      </div>
    </div>
  </div>
)

}
