import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';

function AdminTrailEditPage() {

  const [trails, setTrails] = useState([]);

  useEffect(() => {
    getData();
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

  const handleTrailChange = event => {
    fetch(`http://127.0.0.1:8000/hvapp/trails/${event.target.value}/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setFormData({
      name: resp.name,
      description: resp.description,
      length: resp.length,
      elevationGain: resp.elevation_gain,
      park: resp.park.id,
      difficulty: resp.difficulty.id,
      routeType: resp.routetype.id,
      map_url: resp.map_url,
      img_url: resp.img_url
    }))
    .catch(error => console.log(error))

    // setFormData({
    //   name: chosenTrail.name,
    //   description: chosenTrail.description,
    //   length: chosenTrail.length,
    //   elevationGain: chosenTrail.elevation_gain,
    //   park: chosenTrail.park,
    //   difficulty: chosenTrail.difficulty,
    //   routeType: chosenTrail.routetype,
    //   map_url: chosenTrail.map_url,
    //   img_url: chosenTrail.img_url
    // });

  };



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
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <select className="form-control" onChange={handleTrailChange} name="park">
              <option defaultValue="⬇️ Choose a trail ⬇️"> -- Choose a trail -- </option>
              {trails.map((t, index) => <option key={index} value={t.id}>{t.name}</option>)}
            </select>
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
              name='elevationGain'
              defaultValue={elevationGain}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="park" value={park}>
              <option defaultValue="⬇️ Choose a park ⬇️"> -- Choose a park -- </option>
              {parkList.map((p, index) => <option key={index} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="difficulty" value={difficulty}>
              <option defaultValue="⬇️ Choose a difficulty ⬇️"> -- Choose a difficulty -- </option>
              {difficultyList.map((d, index) => <option key={index} value={d.id}>{d.rank}</option>)}
            </select>
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="routeType" value={routeType}>
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
          <button className="admin-button" type="submit">edit trail</button>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminTrailEditPage;
