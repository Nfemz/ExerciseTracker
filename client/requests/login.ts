export const loginUser = async (email: string, password: string) => {
  try {
    const res = await fetch('http://localhost:9000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {message} = await res.json();

    console.warn(message);
  } catch (err) {
    console.warn('failure to loginUser', err);
  }
};
