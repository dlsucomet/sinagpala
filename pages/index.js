import Head from 'next/head'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
import NoSsr from '../components/NoSsr'
// import styles from '../styles/Home.module.css'

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

export default function Home() {
  const classes = useStyles();
  const data = {
    annual_potential: 4,
    hourly_potential: 3,
    daily_potential: 3,
    avail_rooftop: 34,
    num_panels: 4,
  }

  return (
    <NoSsr>
      <div className={classes.container}>
        <Head>
          <title>Sinagpala</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
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
            <Image src="/Logo.svg" alt="Sinagpala Logo" width={150} height={150} className={classes.logo}/>
            Sinagpala
          </h1>

          <SummaryCard data={data}/>
          <br/>
          <EnvironmentCard data={data}/>  

          <p className={classes.description}>
          Have your rooftops checked for its solar energy potential.
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
