import Head from 'next/head'
import { makeStyles } from '@mui/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import NoSsr from '../components/NoSsr'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

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
  descriptionTitle: {
    fontSize: '2rem'
  },
  description: {
    fontSize: '1.5rem',
    maxWidth: '550px',
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
  logo: {
    verticalAlign: 'middle',
  },
  tableContainer: {
    width: '350px'
  },
  tableContent: {
    fontSize: '1.2rem'
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <NoSsr>
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

      <div className={classes.container}>
        <main className={classes.main}>

          <div className={classes.infoBlock}>
            <h2 className={[classes.centerText, classes.descriptionTitle].join(" ")}>What&apos;s Sinagpala？</h2>
            <p className={classes.description}>
              Sinagpala is a project that aims to provide a solar energy potential assessment to Marikina Buildings. With the rising traction of shifting towards renewable energy, this website can help users visualize and digest the solar energy potential information of select Marikina buildings.
            </p>
          </div>

          <div className={classes.infoBlock}>
            <h2 className={[classes.centerText, classes.descriptionTitle].join(" ")}>Check your rooftop now!</h2>
            <p className={classes.description}>
              Start checking our your Marikina rooftop by either looking for your address or by exploring our map. By selecting an available building<sup>1</sup>, you will be able to see its solar energy potential along with other solar information.
            </p>
          </div>

          <p className={classes.description}> 
              <Typography sx={{ fontSize: '12px' }}>
                  <sup>1</sup>The building polygons visualized in the application are the OpenStreetMap building polygons whose attributes are assigned based on the aggregated model rooftop segment predictions matched using building assignment.
              </Typography>
          </p>

          <div className={classes.infoBlock}>
            <h2 className={[classes.centerText, classes.descriptionTitle].join(" ")}>Panel Specifications Used</h2>
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
                    <TableCell className={classes.tableContent}>Variable</TableCell>
                    <TableCell className={classes.tableContent}>Assumed Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableContent}>Module efficiency</TableCell>
                    <TableCell className={classes.tableContent}>15.5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableContent}>Module dimensions</TableCell>
                    <TableCell className={classes.tableContent}>1.650m x 0.992m </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableContent}>Module power rating</TableCell>
                    <TableCell className={classes.tableContent}>250w </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className={classes.infoBlock}>
            <h2 className={[classes.centerText, classes.descriptionTitle].join(" ")}>Limitation</h2>
            <p className={classes.description}>
              This project is only to be used as a proof of concept. Several limitations such as limited open-sourced data and consideration to the electronics aspect, among others, can lead to biases with the assessments made by the application.
            </p>
            <p className={classes.description}>
              Additionally, the estimations provided have been reduced by 30%  as to account for shading effects. Further validation for this rate must be done for the local setting. 
            </p>
          </div>

        </main>
        <Footer />
      </div>
    </NoSsr>
  )
}
