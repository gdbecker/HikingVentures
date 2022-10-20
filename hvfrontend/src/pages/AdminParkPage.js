import React, { Fragment, useState, useEffect } from 'react';
import APIService from '../components/APIService';
import Footer from '../components/Footer';

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
    APIService.GetStates()
    .then(resp => resp.json())
    .then(resp => {
      setStateList(resp)
    })
    .catch(error => console.log(error))
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({ name, description, city, state, img_url });
    APIService.AddPark(body)
    .then(() => {
      setFormSent(true);
    })
    .catch(error => console.log(error))
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
            <h1 className="admin-header">add park</h1>
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
          <div className="col-3">
            {img_url !== '' ? showImage() : null}
          </div>
        </div>

      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AdminParkPage;
