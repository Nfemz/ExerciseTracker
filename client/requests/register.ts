export const registerUser = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:9000/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {message} = await res.json();
    console.warn(message);
  } catch (err) {
    console.warn('Failure to register user ', err);
  }
};
