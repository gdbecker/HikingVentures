import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

function AdminTrailEditPage() {

  const {id} = useParams()

  const [trails, setTrails] = useState([]);

  useEffect(() => {
    getData();
    if (id !== ':id') {
      fetch(`http://127.0.0.1:8000/hvapp/trails/${id}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setFormData({
        trailID: resp.id,
        name: resp.name,
        description: resp.description,
        length: resp.length,
        elevation_gain: resp.elevation_gain,
        parkID: resp.park.id,
        difficultyID: resp.difficulty.id,
        routetypeID: resp.routetype.id,
        map_url: resp.map_url,
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
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/trails/`, config)
         .then(function (response) {
           setTrails(response.data)
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
    trailID: '',
    name: '',
    description: '',
    length: '',
    elevation_gain: '',
    parkID:'',
    difficultyID:'',
    routetypeID:'',
    map_url:'',
    img_url:''
  });

  const { trailID, name, description, length, elevation_gain, parkID, difficultyID, routetypeID, map_url, img_url } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTrailChange = event => {
    fetch(`http://127.0.0.1:8000/hvapp/trails/${event.target.value}/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setFormData({
      trailID: resp.id,
      name: resp.name,
      description: resp.description,
      length: resp.length,
      elevation_gain: resp.elevation_gain,
      parkID: resp.park.id,
      difficultyID: resp.difficulty.id,
      routetypeID: resp.routetype.id,
      map_url: resp.map_url,
      img_url: resp.img_url
    }))
    .catch(error => console.log(error))
  };

  let [parkList, setParkList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        axios.get(`${process.env.REACT_APP_API_URL}/hvapp/parks/`, config)
         .then(function (response) {
           setParkList(response.data)

         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
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

  let updateTrail = async () => {
    var park = parkList.filter(p => {return p.id == parkID})[0]
    var difficulty = difficultyList.filter(d => {return d.id == difficultyID})[0]
    var routetype = routeTypeList.filter(r => {return r.id == routetypeID})[0]

    await fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/${trailID}/update/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, description, length, elevation_gain, parkID, difficultyID, routetypeID, map_url, img_url })
    })
    setFormSent(true)
  }

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    updateTrail()
  };

  let deleteTrail = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/${trailID}/delete/`, {
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
    deleteTrail()
  };

  if (formSent) {
    setFormData({
      trailID: '',
      name: '',
      description: '',
      length: '',
      elevation_gain: '',
      parkID:'',
      difficultyID:'',
      routetypeID:'',
      map_url:'',
      img_url:''
    });
    window.location.reload(false);
  }

  return (
    <div id="admin-page">
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="admin-header">edit trail</h1>
          </div>
          <div className="col-2">
          </div>
        </div>
      </div>


      <div className="container mt-5 account-form">
        <form>
          <div className="form-group">
            <select className="form-control" onChange={handleTrailChange} name="trailID" value={trailID}>
              <option defaultValue="⬇️ Choose a trail ⬇️"> -- Choose a trail -- </option>
              {trails.map((t, index) => <option key={index} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='trail name'
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
              placeholder='length'
              name='length'
              defaultValue={length}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='elevation gain'
              name='elevation_gain'
              defaultValue={elevation_gain}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="parkID" value={parkID}>
              <option defaultValue="⬇️ Choose a park ⬇️"> -- Choose a park -- </option>
              {parkList.map((p, index) => <option key={index} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="difficultyID" value={difficultyID}>
              <option defaultValue="⬇️ Choose a difficulty ⬇️"> -- Choose a difficulty -- </option>
              {difficultyList.map((d, index) => <option key={index} value={d.id}>{d.rank}</option>)}
            </select>
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="routetypeID" value={routetypeID}>
              <option defaultValue="⬇️ Choose a route type ⬇️"> -- Choose a route type -- </option>
              {routeTypeList.map((r, index) => <option key={index} value={r.id}>{r.type}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='text'
              placeholder='map url'
              name='map_url'
              defaultValue={map_url}
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
              defaultValue={img_url}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <button className="admin-button" type="submit" onClick={e => onSubmitEdit(e)}>edit trail</button>
          <button className="admin-button" type="submit" onClick={e => onSubmitDelete(e)}>delete trail</button>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminTrailEditPage;
