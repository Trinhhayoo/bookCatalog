/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#191624',
        near_black: '#202027',
        grey_bg: '#2F303A',
        cancel_grey: '#636669',
        submit_blue: '#5291CC',
        sign_up_blue: '#607EE9',
        sign_up_now: '#D34692',
        bg_sign_up: '#2F303A',
        form_sign_up: '#202027',
        input_blue: '#385CDD',
        player_playlist: '#2F2F2F'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),

  ],
}