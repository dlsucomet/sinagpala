import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { makeStyles } from '@mui/styles'
import Header from '../components/header'
import Footer from '../components/footer'
import NoSsr from '../components/NoSsr'
import data from './api/marikinaBounds/marikina_polygon_bounds.json'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import dynamic from 'next/dynamic'  
import Typography from '@mui/material/Typography'

const LinePlot = dynamic(() => import("../components/line-plot"), {
  loading: () => "Loading...",
  ssr: false
});

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 2rem',
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.yellow.secondary}, #FFFFFF)`
  },
  main: {
    minHeight: '90vh',
    padding: '3rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    lineHeight: 1.15,
    letterSpacing: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    verticalAlign: 'middle',
  },
  dataRow: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '80%',
    margin: '2rem 0',
    textAlign: 'center',
  },
  dataColumn: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem'
  },
  infoBlock: {
    fontSize: '30px',
  },
  dataBlock: {
    fontSize: '60px',
    color: theme.palette.orange.main,
    fontWeight: 'bold',
  },
  imgBound: {
    margin: '100px'
  },
  underline: {
    textDecoration: 'underline'
  },
  centerText: {
    width: '80%'
  }
}));

function Item(props) {
  const { sx, ...other } = props;
  const classes = useStyles();
  return (
    <Box
      sx={{
        ...sx,
      }} 
      className={classes.dataRow}
      {...other}
    />
  )
}

export default function Home({ data }) {
  const classes = useStyles();
  const marikina_data = data.properties;
  // console.log(marikina_data)
  return (
    <NoSsr>
      <div className={classes.container}>
        <Head>
          <title>Sinagpala</title>
          <meta name="description" content="Explore the solar potential of Marikina City today with Sinagpala" />
          <link rel="icon" type="image/png" 
          href="../public/logo.svg" />
          <link
              rel="preload"
              href="/fonts/Ropa_Sans/RopaSans-Regular.ttf"
              as="font"
              crossOrigin=""
            />
        </Head>
        <Header />

        <main className={classes.main}>
          <Item>
            <Typography variant="h1" className={classes.title} >
              <Image src="/Logo.svg" alt="Sinagpala Logo" width={150} height={150} className={classes.logo} priority={true}/>
              Sinagpala
            </Typography>
          </Item>

          <Item>
            <Typography variant="h6" className={classes.centerText}>
              Have your rooftops checked for its solar energy potential.
            </Typography>
          </Item>

          <Item>
            <Button variant="contained">
              <Link href="/explore">
                  <a>
                      <p>Explore Marikina Area</p>
                  </a>
              </Link>
            </Button>
          </Item>

          <Item>
            <Typography variant="h3" className={classes.centerText}>
              Did You Know?
            </Typography>
          </Item>

          <Item>
            <Typography variant="h6" className={classes.centerText}>
              Marikina City has a household energy consumption of 1,868 kWh/yr which is relatively high compared
              compared to the Philippines&apos; average of 1,150 kWh/yr. With the growing demand for electricity, 
              solar panels can help reduce the demand of electricity and help households save money on electricity. 
            </Typography>
            <Typography variant="p" className={classes.centerText}>
            Source: <Link href="https://www.shell.com/energy-and-innovation/the-energy-future/scenarios/new-lenses-on-future-cities/_jcr_content/par/tabbedcontent/tab_912648081/textimage.stream/1519803359679/eb0a0d02c968c9b0589d0539a9d447a956cf8848/city-resilience-study-marikina-city.pdf"><a className={classes.underline} target="_blank">Shell Philippines, 2015</a></Link>
            </Typography>
          </Item>

          <Item>
            <Image src="/marikina_bounds.png" alt="Sinagpala Logo" width={550} height={550} className={classes.imgBound} priority={true}/>
            <div className={classes.dataColumn}>
              <div className={classes.infoBlock}> 
                Marikina has an estimated {<br />}
                potential of having {<br />} 
                <span className={classes.dataBlock}>
                  {marikina_data['total_kwh']}
                </span> kWh {<br />}
                of solar energy
              </div>
            </div>
          </Item>

          <Item>
           <Typography variant="h4" className={classes.centerText}>
              When the sun&apos;s out high, so will the solar energy potential!
            </Typography>
          </Item>

          <Item>
            <Typography variant="p" className={classes.centerText}>
              Solar enegy is a renewable energy resource that relies on the energy emmitted from the sun. This means that on brighter, sunnier days, your solar panel could potentially generate more energy! This also means that on hotter months, you could also generate more. Check out our calculated potential for the Marikina area! <sup>1</sup>
            </Typography>
          </Item>

          <Typography sx={{fontSize: '12px'}}>
            <sup>1</sup>Estimated potentials are only for proof of concept, please refer to limitations on the {' '} 
              <span style={{textDecoration: 'underline'}}>
                <Link href="/about">
                  about us
                </Link>
              </span> 
            {' '}page for more information.
          </Typography>

          <Item>
            <LinePlot data={{properties:marikina_data}}
                        type="hour"
                        width={750}
                        height={450}
            />
          </Item>

          <Item>
            <LinePlot data={{properties:marikina_data}}
                        type="month"
                        width={750}
                        height={450}
            />
          </Item>

          <Item>
            <Typography variant="h3" className={classes.centerText}>
              Interested in solar? 
            </Typography>
          </Item>
          
          <Item>
            <Typography variant="h6" className={classes.centerText}>
              See <Link href="https://residential.meralco.com.ph/products-services-and-programs/solar-net-metering"><a className={classes.underline} target="_blank">solar net metering </a></Link> {' '}
               on how you can apply for a solar installation today. Note that the estimations displayed in the application
              are merely estimates given area-wide data. For a more accurate evaluation, consult with solar experts.
            </Typography>
          </Item>

          <Item>
            <Button variant="contained">
              <Link href="/explore">
                  <a>
                      <p>Explore Marikina Area</p>
                  </a>
              </Link>
            </Button>
          </Item>
        </main>

        <Footer />
      </div>
    </NoSsr>
  )
}

export async function getStaticProps(){
  return {
    props: {
      data: data.features[0],
    },
  }
}

