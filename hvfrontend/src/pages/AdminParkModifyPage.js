import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

function AdminParkModifyPage() {

  const {id} = useParams()

  const [parks, setParks] = useState([]);

  useEffect(() => {
    getData();
    if (id !== ':id') {
      fetch(`http://127.0.0.1:8000/hvapp/parks/${id}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setFormData({
        parkID: resp.id,
        name: resp.name,
        description: resp.description,
        city: resp.city,
        state: resp.state.id,
        img_url: resp.img_url
      }))
      .catch(error => console.log(error))
    }

  },[]);

  async function getData() {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/parks/`, config)
         .then(function (response) {
           setParks(response.data)
         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
  }

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    parkID:'',
    name: '',
    description: '',
    city: '',
    state: '',
    img_url:''
  });

  const { parkID, name, description, city, state, img_url } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleParkChange = event => {
    fetch(`http://127.0.0.1:8000/hvapp/parks/${event.target.value}/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setFormData({
      parkID: resp.id,
      name: resp.name,
      description: resp.description,
      city: resp.city,
      state: resp.state.id,
      img_url: resp.img_url
    }))
    .catch(error => console.log(error))
  };

  let [stateList, setStateList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        axios.get(`${process.env.REACT_APP_API_URL}/hvapp/states/`, config)
         .then(function (response) {
           setStateList(response.data)
         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
  },[])

  let updatePark = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/${parkID}/update/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, description, city, state, img_url })
    })
    setFormSent(true)
  }

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    updatePark()
  };

  let deletePark = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/${parkID}/delete/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
    })
    setFormSent(true)
  }

  const onSubmitDelete = async (e) => {
    e.preventDefault();
    deletePark()
  };

  if (formSent) {
    setFormData({
      parkID:'',
      name: '',
      description: '',
      city: '',
      state: '',
      img_url:''
    });
    window.location.reload(false);
  }

  return (
    <div id="admin-page">
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="admin-header">modify park</h1>
          </div>
          <div className="col-2">
          </div>
        </div>
      </div>


      <div className="container mt-5 account-form">
        <form>
          <div className="form-group">
            <select className="form-control" onChange={handleParkChange} name="parkID" value={parkID}>
              <option defaultValue="⬇️ Choose a park ⬇️"> -- Choose a park -- </option>
              {parks.map((p, index) => <option key={index} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='park name'
              name='name'
              defaultValue={name}
              onChange={e => onChange(e)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className='form-control'
              type='text'
              placeholder='trail description'
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
            <select className="form-control" onChange={e => onChange(e)} name="state" value={state}>
              <option defaultValue="⬇️ Choose a park ⬇️"> -- Choose a park -- </option>
              {stateList.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='main image url'
              name='img_url'
              defaultValue={img_url}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <button className="admin-button" type="submit" onClick={e => onSubmitEdit(e)}>edit park</button>
          <button className="admin-button" type="submit" onClick={e => onSubmitDelete(e)}>delete park</button>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminParkModifyPage;
