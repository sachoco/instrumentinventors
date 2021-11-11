const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: 'jit',
  purge: ["./**/*.php", "./src/**/*.js"],
  // darkMode: false, // or 'media' or 'class'

  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            ul: {
              "> li": {
                paddingLeft: 0,
                "&::before": {
                  display: "none",
                },
              },
            },
          },
        },
      }),
      inset: {
        '2px': '2px',
        '3px': '3px'
      },
      colors: {
        body: "#4f4f4f",
        light: "#707070",
      },
      borderColor: (theme) => ({
        // ...theme('colors'),
        DEFAULT: theme("colors.black", "currentColor"),
      }),
      fontFamily: {
        sans: ["GT Walsheim", ...defaultTheme.fontFamily.sans],
        nav: ["Antipol Extended", "sans-serif"],
        title: ["Antipol Extended", "sans-serif"],
      },
      fontSize: {
        'mobile': '16px',
      },
      backgroundColor: {
        bg: {
          "lighter-gray": "#E6E6E6",
          "light-gray": "#CCCCCC",
          "filter": "#989999",
          gray: "#999999",
          DEFAULT: "#999999",
        },
      },
      backgroundImage: (theme) => ({
        overlay: "url('./assets/overlay.jpg')",
      }),
      zIndex: {
        "-10": "-10",
      },
      padding: {
        "1/3": "33%",
        "1/2": "50%",
        "gallery": "58%",
        "2/3": "66%",
        "3/4": "75%",
        "4/5": "80%",
        "full": "100%",
      },
      margin: {
        "sidemenu-close": "calc(-25vw + 108px)",
      },
      width: {
        "hscreen": "100vh",
        "200px": "200px",
        "220px": "220px",
        "350px": "350px",
        "sidemenu-open": "25vw",
        "sidemenu-open2": "calc(25vw - 108px)",
        "sidemenu-close": "108px",
      },
      maxWidth: {
        "input-name": "190px",
        "input-email": "295px",
      },
      minWidth: {
        "300px": "300px",
      },
      minHeight: {
        "full+2px": "calc(100% + 2px)",
      },
      transitionProperty: {
        'width': 'width',
      },
      transitionDelay: {
        "0": "0ms",
        "2000": "2000ms",
      },
      keyframes: {
        fadein: {
          from: { opacity: 0, visibility: "hidden" },
          to: { opacity: 1, visibility: "visible" },
        },
        fadeout: {
          from: { opacity: 1, visibility: "visible" },
          to: { opacity: 0, visibility: "hidden" },
        },
      },
      animation: {
        fadeIn: "fadein 0.2s linear forwards",
        fadeOut: "fadeout 0.2s linear forwards",
      },
      strokeWidth: {
        "3": "3",
        "4": "4"
      },
      translate: {
         'sidemenu-open': 'calc(25vw - 108px)',
         '-test': "calc(-25vw + 108px)",
      },
      screens: {
        'hbp': {'raw': '(min-height: 800px)'},
        // => @media (orientation: portrait) { ... }
      }
    },
  },

  variants: {
    extend: {
      height: ["group-hover"],
      minHeight: ["group-hover"],
      minWidth: ["group-hover"],
      fontSize: ["group-hover"],
      fontWeight: ["hover"],
      display: ["group-hover"],
      opacity: ["group-hover"],
      transitionDelay: ["group-hover"],
      animation: ["group-hover"],
      visibility: ["group-hover"],
      strokeWidth: ["group-hover"],
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
  ],
};
