import React, { useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../../context/AppContext'
import './Enquire.css'

const Enquire = ({ product = {}, onClose }) => {
  const { url } = useContext(AppContext)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrMsg('')
    setSuccessMsg('')
    setLoading(true)
    try {
      const payload = { productId: product.id || product.product_id || product.id, ...form }
      const res = await axios.post(`${url}/enquiries`, payload)
      if (res.status === 201) {
        setSuccessMsg('Enquiry sent successfully')
        setForm({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => {
          setLoading(false)
          onClose && onClose()
        }, 900)
      } else {
        setErrMsg(res.data?.message || 'Unable to send enquiry')
        setLoading(false)
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || error.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="enquire-modal">
      <div className="enquire-content">
        <div className="enquire-left">
          <img src={product.image_url} alt={product.name} />
          <div className="enquire-product-info">
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <p className="short-desc">{product.long_desc}</p>
          </div>
        </div>
        <div className="enquire-right">
          <div className="enquire-header">
            <h2>Send an Enquiry</h2>
            <button className="close-btn" onClick={() => onClose && onClose()}>×</button>
          </div>
          <form className="enquire-form" onSubmit={onSubmit}>
            <input name="name" value={form.name} onChange={onChange} placeholder="Your name" required />
            <input name="email" value={form.email} onChange={onChange} type="email" placeholder="Your email" required />
            <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" />
            <textarea name="message" value={form.message} onChange={onChange} placeholder="Your message" rows={4} />
            {errMsg && <p className="enquire-error">{errMsg}</p>}
            {successMsg && <p className="enquire-success">{successMsg}</p>}
            <div className="enquire-actions">
              <button type="button" className="btn-secondary" onClick={() => onClose && onClose()}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Enquiry'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Enquire
