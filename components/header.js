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
import { useState, useEffect } from "react"
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'

// Passing props and theme 
// https://stackoverflow.com/questions/48879517/passing-props-to-mui-styles
const useStyles = props => makeStyles(theme => ({
    header: {
        display: 'flex',
        padding: '0 2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '8vh',
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
            textDecorationColor: props.pathname == '/' ? 'black' : 'white',
            textDecoration: 'underline'
        },
    },
    headerLinks: {
        display: 'flex',
    },
    headerText: {
        color: props.pathname == '/' ? 'black' : 'white',
    },
    logoHeaderLink: {
        marginLeft: '15px',
        display: 'flex',
        // lineHeight: 1.15,
        // fontSize: '1.5rem',
        letterSpacing: '4px',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        opacity: '1',
        transition: 'opacity 0.5s ease-in-out',
    },
    hideIcon: {
        // visibility: 'hidden',
        opacity: '0'
    }
}));

export default function Header() {
    const router = useRouter();
    const classes = useStyles({ 'pathname': router.pathname })();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      })
    
    const handleScroll = () => {
        console.log('scroll event', window.scrollY)
        setScrollY(window.scrollY)
    }

    return (
        router.pathname == '/' ?
            <header className={[classes.header, classes.headerYellow].join(" ")}>
                <div className={[classes.logoHeaderLink, scrollY < 10 ? classes.hideIcon : ""].join(" ")}>
                    <Image src="/Logo.svg" alt="Sinagpala Logo" width={36} height={36} />
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
                </div>
            </header>
            :
            <header className={[classes.header, classes.headerBrown].join(" ")}>
                <div className={classes.logoHeaderLink}>
                    <Image src="/Logo (Alt).svg" alt="Sinagpala Logo" width={36} height={36} />
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