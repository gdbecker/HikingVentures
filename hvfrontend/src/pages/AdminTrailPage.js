import React, { Fragment, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';

function AdminTrailPage() {

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    length: '',
    elevationGain: '',
    park:'',
    difficulty:'',
    routeType:'',
    map_url:'',
    img_url:''
  });

  const { name, description, length, elevationGain, park, difficulty, routeType, map_url, img_url } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  let [parkList, setParkList] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/parks/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setParkList(resp))
    .catch(error => console.log(error))
  },[])

  let [difficultyList, setDifficultyList] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/difficulties/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setDifficultyList(resp))
    .catch(error => console.log(error))
  },[])

  let [routeTypeList, setRouteTypeList] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/routetypes/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setRouteTypeList(resp))
    .catch(error => console.log(error))
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    const body = JSON.stringify({ name, description, length, elevationGain, park, difficulty, routeType, map_url, img_url });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hvapp/trails/create/`, body, config)
      setFormSent(true)
    } catch (err) {
      console.log(err.response.data)
    }
  };

  if (formSent) {
    setFormData({
      name: '',
      description: '',
      length: '',
      elevationGain: '',
      park:'',
      difficulty:'',
      routeType:'',
      map_url:'',
      img_url:''
    });
    window.location.reload(false);
  }

  const showImage = () => (
    <Fragment>
      <img className="admin-form-photo" src={`${img_url}`} alt="trail image"/>
    </Fragment>
  );

  return (
    <div id="admin-page">
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="admin-header">add trail</h1>
          </div>
          <div className="col-2">
          </div>
        </div>
      </div>


      <div className="container mt-5 account-form">
        <div className="row">
          <div className="col-9">
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='trail name'
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
                  placeholder='length'
                  name='length'
                  value={length}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='elevation gain'
                  name='elevationGain'
                  value={elevationGain}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <select className="form-control" onChange={e => onChange(e)} name="park">
                  <option value="⬇️ Choose a park ⬇️"> -- Choose a park -- </option>
                  {parkList.map((p, index) => <option key={index} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <select className="form-control" onChange={e => onChange(e)} name="difficulty">
                  <option value="⬇️ Choose a difficulty ⬇️"> -- Choose a difficulty -- </option>
                  {difficultyList.map((d, index) => <option key={index} value={d.id}>{d.rank}</option>)}
                </select>
              </div>
              <div className="form-group">
                <select className="form-control" onChange={e => onChange(e)} name="routeType">
                  <option value="⬇️ Choose a route type ⬇️"> -- Choose a route type -- </option>
                  {routeTypeList.map((r, index) => <option key={index} value={r.id}>{r.type}</option>)}
                </select>
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='map url'
                  name='map_url'
                  value={map_url}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='main image url'
                  name='img_url'
                  value={img_url}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <button className="admin-button" type="submit">add trail</button>
            </form>
          </div>
          <div className="col-3">
            {img_url !== '' ? showImage() : null}
          </div>
        </div>

      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminTrailPage;
