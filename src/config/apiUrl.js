// export const apiUrl = 'https://lac-app-backend.herokuapp.com';
export const apiUrl =
  'https://5158-2400-adc1-146-a100-1533-ddfa-f6ce-feab.in.ngrok.io';
// export const apiUrl = 'https://cobber-backend.herokuapp.com'; // DEPLOYMENT(STAGING) purpose=

export const imageUrl = pic => `${apiUrl}/api/v1/images/${pic}`;

export const URL = link => {
  return `${apiUrl}/api/v1/${link}`;
};

export default function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  }
};

export const maxContentLength = 30;
