import Head from 'next/head'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import NoSsr from '../components/NoSsr'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 2rem',
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.yellow.secondary}, #FFFFFF)`
  },
  
  main: {
    minHeight: '100vh',
    padding: '4rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    margin: 0,
    lineHeight: 1.15,
    fontSize: '4rem',
    letterSpacing: '8px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  
  description: {
    margin: '4rem 0',
    lineHeight: 1.5,
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  
  logo: {
    verticalAlign: 'middle',
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <NoSsr>
      <div className={classes.container}>
        <Head>
          <title>Sinagpala: About us</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" type="image/png" 
          href="/logo.svg" />
          
          <link
              rel="preload"
              href="/fonts/Ropa_Sans/RopaSans-Regular.ttf"
              as="font"
              crossOrigin=""
            />
        </Head>

        <Header />

        <main className={classes.main}>
          <h1 className={classes.title} >
            <Image src="/Logo.svg" alt="Sinagpala Logo" width={150} height={150} />
            Sinagpala
          </h1>

          <p className={classes.description}>
          About us content here.
          </p>

          <a href="https://nextjs.org/docs" >
              <p>Explore Marikina Area</p>
          </a>

        </main>

        <Footer />
      </div>
    </NoSsr>
  )
}
