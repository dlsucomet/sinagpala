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
        padding: props.pathname == '/explore' ? '2rem 2rem' : '2rem 0',
        borderTop: '1px solid #eaeaea',
        justifyContent: 'center',
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

export default function Footer(){
    const router = useRouter();
    const classes = useStyles({'pathname':router.pathname})();

    return (
      <footer className={classes.footer}>
        Sinagpala © 2021
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.footerLink}
        > */}
        <div className={classes.footerLink}>
           sinagpala.team@gmail.com
        </div>
        {/* </a> */}
      </footer>
    )
}