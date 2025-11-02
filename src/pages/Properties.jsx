// File: src/pages/Properties.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProperties } from '../utils/api'

const PAGE_SIZE = 6

function uniqueLocations(items) {
  return Array.from(new Set(items.map(i => i.location))).sort()
}

export default function Properties() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [items, setItems] = useState([])

  // filters & UI state
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [location, setLocation] = useState('')
  const [sortBy, setSortBy] = useState('recent') // recent | price-asc | price-desc
  const [page, setPage] = useState(1)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchProperties().then(res => {
      if (!mounted) return
      if (res.ok) {
        setItems(res.data)
        setError(null)
      } else {
        setError(res.error || 'Unknown')
      }
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  // derived options
  const locations = useMemo(() => uniqueLocations(items), [items])
  const filtered = useMemo(() => {
    let out = items.slice()
    if (location) out = out.filter(i => i.location === location)
    if (minPrice !== '') out = out.filter(i => i.price >= Number(minPrice))
    if (maxPrice !== '') out = out.filter(i => i.price <= Number(maxPrice))
    if (sortBy === 'price-asc') out.sort((a,b)=>a.price-b.price)
    else if (sortBy === 'price-desc') out.sort((a,b)=>b.price-a.price)
    else out.sort((a,b)=> new Date(b.listedAt) - new Date(a.listedAt))
    return out
  }, [items, location, minPrice, maxPrice, sortBy])

  // pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  useEffect(()=> setPage(1), [location, minPrice, maxPrice, sortBy]) // reset page when filters change
  const pageItems = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE)

  if (loading) return <div className="container">Loading properties...</div>
  if (error) return <div className="container">Error: {error}</div>
  if (items.length === 0) return <div className="container">No properties available.</div>

  return (
    <div className="container properties-page">
      <aside className="filters card">
        <h3>Filters</h3>
        <label>
          Location
          <select value={location} onChange={e=>setLocation(e.target.value)}>
            <option value="">All</option>
            {locations.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label>
          Min price
          <input type="number" value={minPrice} onChange={e=>setMinPrice(e.target.value)} placeholder="e.g. 20000" />
        </label>
        <label>
          Max price
          <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="e.g. 70000" />
        </label>
        <label>
          Sort by
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="recent">Most recent</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </label>
        <div className="muted">Showing {filtered.length} result(s)</div>
      </aside>

      <section className="listings">
        <div className="grid">
          {pageItems.map(p => (
            <article key={p.id} className="card property-card">
              <Link to={`/properties/${p.id}`} className="img-wrap" aria-label={`Open ${p.title}`}>
                <img src={p.images[0]} alt={p.title} />
              </Link>
              <div className="card-body">
                <Link to={`/properties/${p.id}`} className="title">{p.title}</Link>
                <div className="meta">
                  <span>{p.location}</span>
                  <span>• {p.beds}bd</span>
                  <span>• {p.baths}ba</span>
                </div>
                <div className="price">GMD {p.price.toLocaleString()}</div>
                <p className="small">{p.description}</p>
                <Link to={`/properties/${p.id}`} className="btn small">View</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="pagination">
          <button className="btn" onClick={()=>setPage(s=>Math.max(1,s-1))} disabled={page===1}>Prev</button>
          <span>Page {page} / {totalPages}</span>
          <button className="btn" onClick={()=>setPage(s=>Math.min(totalPages,s+1))} disabled={page===totalPages}>Next</button>
        </div>
      </section>
    </div>
  )
}
