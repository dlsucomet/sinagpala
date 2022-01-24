import Head from 'next/head'
import { makeStyles } from '@mui/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import NoSsr from '../components/NoSsr'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 2rem',
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.yellow.secondary}, #FFFFFF)`
  },
  main: {
    minHeight: '90vh',
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
  infoBlock: {
    padding: '2rem 0'
  },
  centerText: {
    textAlign: 'center',
  },
  description: {
    // margin: '4rem 0',
    // lineHeight: 1.5,
    // fontSize: '1.5rem',
    maxWidth: '550px',
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  logo: {
    verticalAlign: 'middle',
  },
  tableContainer: {
    width: '350px'
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <NoSsr>
      <div className={classes.container}>
        <Head>
          <title>Sinagpala: About us</title>
          <meta name="description" content="Explore the solar potential of Marikina City today with Sinagpala" />
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

          <h1 className={classes.centerText}>Sinagpala: About Us</h1>
          
          <div className={classes.infoBlock}>
            <h2 className={classes.centerText}>What&apos;s Sinagpala？</h2>
            <p className={classes.description}>
              Sinagpala is a project that aims to provide a solar energy potential assessment to Marikina Buildings. With the rising traction of shifting towards renewable energy, this website can help users visualize and digest the solar energy potential information of select Marikina buildings.
            </p>
          </div>

          <div className={classes.infoBlock}>
            <h2 className={classes.centerText}>Check your rooftop now!</h2>
            <p className={classes.description}>
              Start checking our your Marikina rooftop by either looking for your address or by exploring our map. By selecting an available building, you will be able to see its solar energy potential along with other solar information.
            </p>
          </div>

          <div className={classes.infoBlock}>
            <h2 className={classes.centerText}>Panel Specifications Used</h2>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table aria-label="simple table">
                <caption> 
                  <a
                    href="https://sunroof.withgoogle.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.footerLink}
                  >
                    Adapted from Google Sunroof
                  </a>
                </caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Variable</TableCell>
                    <TableCell>Assumed Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                      <TableCell >Module efficiency</TableCell>
                      <TableCell >15.5%</TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell >Module dimensions</TableCell>
                      <TableCell >1.650m x 0.992m </TableCell>
                  </TableRow>
                  <TableRow>
                      <TableCell >Module power rating</TableCell>
                      <TableCell >250w </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className={classes.infoBlock}>
            <h2 className={classes.centerText}>Limitation</h2>
            <p className={classes.description}>
              This project is only to be used as a proof of concept. Several limitations such as limited open-sourced data and consideration to the electronics aspect, among others, can lead to biases with the assessments made by the application.
            </p>
          </div>

        </main>

        <Footer />
      </div>
    </NoSsr>
  )
}
