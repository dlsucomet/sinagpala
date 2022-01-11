import Head from 'next/head'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'
import SummaryCard from '../components/summary-card'
import EnvironmentCard from '../components/environment-card'
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
  
  header: {
    display: 'flex',
    flex: 1,
    padding: '2rem 0',
    borderTtop: '1px solid #ebd6d6',
    justifyContent: 'right',
    alignItems: 'center',
  },
  
  headerLink: {
    // display: 'flex',
    // justifyContent: 'right',
    // flexGrow: 1,
    fontSize: '1.5rem',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline'
    },
  },
  
  footer: {
    display: 'flex',
    flex: 1,
    padding: '2rem 0',
    borderTop: '1px solid #eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  footerLink: {
    // display: 'flex',
    // justifyContent: 'center',
    // flexGrow: 1,
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline'
    },
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
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
            rel="preload"
            href="/fonts/RopaSans/RopaSans-Regular.ttf"
            as="font"
            crossOrigin=""
          />
      </Head>

      <header className={classes.header}>
        <Link href="/about">
          <a
            className={classes.headerLink}
          >
            About us
          </a>
        </Link>
      </header>

      <main className={classes.main}>
        <h1 className={classes.title} >
          <Image src="/Logo.svg" alt="Sinagpala Logo" width={150} height={150} className={classes.logo}/>
          Sinagpala
        </h1>

        {/* <p className={classes.description}>
          Search Component {' '}
          <code className={classes.code}>https://medium.com/@matswainson/building-a-search-component-for-your-next-js-markdown-blog-9e75e0e7d210</code>
        </p> */}

        <SummaryCard data={data}/>
        <br/>
        <EnvironmentCard data={data}/>  

        <p className={classes.description}>
        Have your rooftops checked for its solar energy potential.
        </p>

        <a href="https://nextjs.org/docs" >
            <p>Explore Marikina Area</p>
        </a>

        {/* <div className={classes.grid}>
          <a href="https://nextjs.org/docs" className={classes.card}>
            <h2>Documentation &rarr,</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={classes.card}>
            <h2>Learn &rarr,</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={classes.card}
          >
            <h2>Examples &rarr,</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={classes.card}
          >
            <h2>Deploy &rarr,</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={classes.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.footerLink}
        >
          Powered by{' '}
          <span className={classes.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
