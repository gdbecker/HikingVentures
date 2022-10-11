import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';

function AdminParkPage() {

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    state: '',
    img_url:''
  });

  const { name, description, city, state, img_url } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  let [stateList, setStateList] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/states/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setStateList(resp))
    .catch(error => console.log(error))
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();

    // fetch('http://127.0.0.1:8000/hvapp/parks/create/', {
    //   'method':'POST',
    //   headers: {
    //     'Content-Type':'application/json'
    //   },
    //   body: JSON.stringify({ formData })
    // })
    // .then(resp => resp.json())
    // .catch(error => console.log(error))

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    const body = JSON.stringify({ name, description, city, state, img_url });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hvapp/parks/create/`, body, config)
      setFormSent(true)
    } catch (err) {
      console.log(err)
    }
  };

  if (formSent) {
    setFormData({
      name: '',
      description: '',
      state: '',
      img_url:''
    });
    window.location.reload(false);
  }

  return (
    <div id="admin-page">
      <h1 className="admin-header">add park</h1>

      <div className="container mt-5 account-form">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='park name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className='form-control'
              type='text'
              placeholder='park description'
              name='description'
              defaultValue={description}
              onChange={e => onChange(e)}
              required
            >
            </textarea>
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='city'
              name='city'
              defaultValue={city}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="state">
              <option value="⬇️ Choose a state ⬇️"> -- Choose a state -- </option>
              {stateList.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='image url'
              name='img_url'
              value={img_url}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <button className="admin-button" type="submit">add park</button>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminParkPage;
