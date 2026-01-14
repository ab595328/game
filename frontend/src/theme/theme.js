import bg from "../assets/teenpatti-bg.jpg";

const theme = {
  bg: `
    bg-cover bg-center bg-no-repeat
  `,

  bgStyle: {
    backgroundImage: `url(${bg})`
  },

  card: `
    bg-black/70
    backdrop-blur-md
    border border-green-500/40
    shadow-[0_0_30px_rgba(34,197,94,0.4)]
  `,

  primary: `
    bg-green-600 hover:bg-green-500
    transition-all duration-200
    shadow-[0_0_15px_rgba(34,197,94,0.6)]
    active:scale-95
  `,

  input: `
    w-full p-3 rounded
    bg-black/60 text-white
    border border-gray-700
    focus:outline-none
    focus:border-green-500
    focus:shadow-[0_0_10px_rgba(34,197,94,0.6)]
  `
};

export default theme;
