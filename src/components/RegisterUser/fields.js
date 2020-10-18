import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().trim().required('Por favor, ingresa un nombre'),
  email: yup
    .string()
    .trim()
    .email('Por favor, ingresa un correo válido.')
    .required('Por favor, ingresa tu correo.'),
  password: yup.string().trim().required('Por favor, ingresa tu contraseña.'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Por favor, ingresa tu contraseña.')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.')
});

export default [
  {
    type: 'text',
    name: 'name',
    label: 'Nombre completo',
    placeholder: 'Ingresa tu nombre completo',
    autocomplete: 'name'
  },
  {
    type: 'email',
    name: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    autocomplete: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Contraseña',
    placeholder: 'Ingresa tu contraseña',
    autocomplete: 'off'
  },
  {
    type: 'password',
    name: 'confirmPassword',
    label: 'Confirmar contraseña',
    placeholder: 'Confirma tu contraseña',
    autocomplete: 'off'
  }
];
