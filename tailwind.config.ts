/** @type {import('tailwindcss').Config} */

export default {
    theme: {
        extend: {
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            fontFamily: {
                sans: ['Noto Sans JP', 'sans-serif'],
            },
            fontSize: {
                h1: '34px',
                h2: '24px',
                h3: '30px',
                h4: '24px',
                h5: '18px',
                h6: '16px',
            },
            colors: {
                primary: '#1e4290',
                secondary: {
                    100: '#a38e5a',
                    200: '#a38e5a4d',
                    300: '#a38e5a26',
                    400: '#f4f1eb'
                },
                light: '#eaedf3',
                info: {
                    100: '#7cd1f9',
                    200: '#b7d7e6',
                    300: '#249ed8',
                    400: '#c9dae1',
                    500: '#000000a3',
                    600: '#1f68c9',
                    700: '#5c9ee7',
                },
                dark: '#000',
                white: '#fff',
                red: '#e5111b',
                gray: '#333',
                grey: '#d5d5d5',
                success: '#34b46d',
                error: {
                    100: '#e5111b',
                },
                table: {
                    100: '#d4ddf0',
                    200: '#f2f2f2',
                    300: '#eff1f5',
                    400: '#efefef',
                },
                pink: '#fe2a2a1a',
                blue: {
                    100: '#5b9bd5'
                }
            },
            borderRadius: {
                none: '0',
                sm: '3px',
                md: '5px',
                DEFAULT: '10px',
                lg: '18px',
                xl: '27px',
                xxl: '32px',
                full: '9999px',
            },
            opacity: {
                70: '.7',
                30: '.3',
            },
            textDecoration: ['focus-visible'],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '0rem',
                xl: '0rem',
                '2xl': '0rem',
            },
            // padding: '1rem',
            screens: {
                sm: '968px',
                md: '1028px',
                lg: '1200px',
                xl: '1200px',
                '2xl': '1200px',
            },
        },
    },

};
