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
import Typography from '@mui/material/Typography'

// Passing props and theme 
// https://stackoverflow.com/questions/48879517/passing-props-to-mui-styles
const useStyles = props => makeStyles(theme => ({
    header: {
        display: 'flex',
        padding: props.pathname == '/explore' ? '0 2rem' : '0',
        justifyContent: props.pathname == '/' ? 'right' : 'space-between',
        alignItems: 'center',
        height: '8vh',
        marginLeft: '-2rem',
        marginRight: '-2rem',
        position: 'sticky',
        top: 0,
        // background: 'rgba(255, 255, 255, 1)',
        zIndex: 999,
    },
    headerYellow: {
        background: theme.palette.yellow.secondary,
    },
    headerBrown: {
        background: theme.palette.brown.main,
    },
    headerLink: {
        justifyContent: 'right',
        // fontSize: '1.5rem',
        alignItems: 'center',
        margin: '0px 15px',
        '&:hover': {
            textDecoration: 'underline'
        },
    },
    headerLinks: {
        display: 'flex',
    },
    headerText: {
        color: 'white'
    },
    logoHeaderLink: {
        marginLeft: '15px',
        display: 'flex',
        // lineHeight: 1.15,
        // fontSize: '1.5rem',
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
            <header className={[classes.header, classes.headerYellow].join(" ")}>
                <Link href="/explore">
                    <a
                        className={classes.headerLink}
                    >
                        <Typography variant="h6">
                            Explore
                        </Typography>
                    </a>
                </Link>
                <Link href="/about">
                    <a
                        className={classes.headerLink}
                    >
                        <Typography variant="h6">
                            About Us
                        </Typography>
                    </a>
                </Link>
            </header>
        :
            <header className={[classes.header, classes.headerBrown].join(" ")}>
                <div className={classes.logoHeaderLink}>
                    <Image src="/Logo (Alt).svg" alt="Sinagpala Logo" width={36} height={36}/>
                    <Link href="/">
                        <a>
                            <Typography className={classes.headerText} variant="h6">
                                Sinagpala
                            </Typography>
                        </a>
                    </Link>
                </div>
                <div className={classes.headerLinks}>
                    <Link href="/explore">
                        <a
                            className={classes.headerLink}
                        >
                            <Typography className={classes.headerText} variant="h6">
                                Explore
                            </Typography>
                        </a>
                    </Link>
                    <Link href="/about">
                        <a
                            className={classes.headerLink}
                        >
                            <Typography className={classes.headerText} variant="h6">
                                About Us
                            </Typography>
                        </a>
                    </Link>
                </div>
            </header>
    )
}