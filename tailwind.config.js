module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/pages/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      padding: {
        content: '40px',
        indent: '5%'
      },
      margin: {
        li: '12px'
      },
      colors: {
        blue: '#1890ff',
        // gray: {
        //   100: '#f7fafc',
        //   200: '#edf2f7',
        //   300: '#e2e8f0',
        //   400: '#cbd5e0',
        //   500: '#a0aec0',
        //   600: '#718096',
        //   700: '#4a5568',
        //   800: '#2d3748',
        //   900: '#1a202c',
        // },
      },
      spacing: {
        5: '5px',
        8: '8px',
        10: '10px',
        36: '36px',
        48: '48px',
        50: '50px',
        60: '60px',
        72: '72px',
        100: '100px',
        150: '150px'
      },
      borderRadius: {
        10: '10px'
      }
    },
    fontSize: {
      header: ['1.25rem', '3'],
      icon: ['1.25rem'],
      h1: ['30px'],
      h2: ['24px'],
      h3: '18px',
      assist: ['12px'],
      14: '14px',
      16: '16px',
      20: '20px'
    },
    fontFamily: {
      header: ['Arial']
    },
    minWidth: {
      sider: '16.67%',
      300: '300px'
    },
    width: {
      sider: '16.67%',
      full: '100%',
      48: '48px',
      36: '36px',
      home: '530px',
      content: 'calc(100vw - 200px)'
    },
    maxWidth: {
      sider: '16.67%',
      full: '100%',
      content: '85%'
    },
    height: {
      full: '100%',
      screen: '100vh',
      36: '36px',
      48: '48px',
      250: '250px',
      300: '300px',
      content: 'calc(100vh - 64px - 69px - 40px)'
    },
    maxHeight: {
      300: '300px'
    }
  },
  plugins: []
};
