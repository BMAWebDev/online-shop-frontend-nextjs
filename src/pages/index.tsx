import { useState } from 'react';

import { register } from 'src/functions';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Home() {
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaValid, setRecaptchaValid] = useState<boolean>(false);

  const [messageResponse, setMessageResponse] = useState<string>('');

  const handleForm = () => {
    if (!lastName || !firstName || !email || !password) {
      alert('Toate campurile sunt obligatorii');
      return false;
    }

    if (!captchaValid) {
      alert('Recaptcha nu a fost validat!');
      return false;
    }

    const data = {
      lastName,
      firstName,
      email,
      password,
    };

    register(data)
      .then((res: any) => {
        setMessageResponse(res.message);
      })
      .catch((err: any) => {
        setMessageResponse(err.message);
      });
  };

  return (
    <div
      style={{
        margin: '0 auto',
        maxWidth: '500px',
        paddingLeft: '100px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h1>Formular de inregistrare</h1>
      <div className='form-group'>
        <label htmlFor='lastname'>Nume</label>
        <input
          type='text'
          id='lastname'
          name='lastname'
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='firstname'>Prenume</label>
        <input
          type='text'
          id='firstname'
          name='firstname'
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Parola</label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <ReCAPTCHA
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        onChange={() => setRecaptchaValid(true)}
      />
      <span>{messageResponse}</span> <br />
      <button onClick={handleForm}>Inregistrare</button>
    </div>
  );
}
