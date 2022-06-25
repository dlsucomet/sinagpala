/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function Footer   -   Web application footer
 *                                  
 *
 * #HOW TO CALL:
 *      <Footer />
 *
 *
 * USED IN:
 * index.js
 * about.js
 * explore.js
 * ------------------------------------------------------------------------------------------
 */
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'

const useStyles = props => makeStyles(theme => ({
  footer: {
    display: 'flex',
    flex: 1,
    padding: '2rem 2rem',
    //  padding: props.pathname == '/explore' ? '2rem 2rem' : '2rem 0',
    borderTop: '1px solid black',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLink: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
    // '&:hover': {
    //   textDecoration: 'underline'
    // },
  },
}));

export default function Footer() {
  const router = useRouter();
  const classes = useStyles({ 'pathname': router.pathname })();

  return (
    <footer className={classes.footer}>
      <div>
        Sinagpala © 2021
      </div>
    </footer>
  )
}