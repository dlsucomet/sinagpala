/**
 * ------------------------------------------------------------------------------------------
 * [COMPONENT]
 * @function Header   -   Web application header
 *                                  
 *
 * #HOW TO CALL:
 *      <Header />
 *
 *
 * USED IN:
 * index.js
 * about.js
 * explore.js
 *
 * ------------------------------------------------------------------------------------------
 */

import Link from 'next/link'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'

// Passing props and theme 
// https://stackoverflow.com/questions/48879517/passing-props-to-mui-styles
const useStyles = props => makeStyles(theme => ({
    header: {
        display: 'flex',
        padding: props.pathname == '/explore' ? '2rem 2rem' : '2rem 0',
        justifyContent: props.pathname == '/' ? 'right' : 'space-between',
        alignItems: 'center',
        height: '10vh',
        marginLeft: '10px',
        marginRight: '10px',
    },
    headerLink: {
        justifyContent: 'right',
        fontSize: '1.5rem',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'underline'
        },
    },
    logoHeaderLink: {
        display: 'flex',
        lineHeight: 1.15,
        fontSize: '1.5rem',
        letterSpacing: '4px',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
}));

export default function Header(){
    const router = useRouter();
    const classes = useStyles({'pathname':router.pathname})();
    
   return (
        router.pathname == '/' ?
            <header className={classes.header}>
                <Link href="/about">
                    <a
                        className={classes.headerLink}
                    >
                        About us
                    </a>
                </Link>
            </header>
        :
            <header className={classes.header}>
                <div className={classes.logoHeaderLink}>
                    <Image src="/Logo.svg" alt="Sinagpala Logo" width={36} height={36}/>
                    <Link href="/">
                        <a>
                            Sinagpala
                        </a>
                    </Link>
                </div>
                <Link href="/about">
                    <a
                        className={classes.headerLink}
                    >
                        About us
                    </a>
                </Link>
            </header>
    )
}