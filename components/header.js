import Link from 'next/link'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import {useRouter} from 'next/router'

// Passing props and theme 
// https://stackoverflow.com/questions/48879517/passing-props-to-mui-styles
const useStyles = props => makeStyles(theme => ({
    header: {
        display: 'flex',
        flex: 1,
        padding: '2rem 0',
        borderTtop: '1px solid #ebd6d6',
        justifyContent: props.pathname == '/' ? 'right' : 'left',
        alignItems: 'center',
    },
    headerLink: {
        display: 'flex',
        justifyContent: 'right',
        flexGrow: 1,
        fontSize: '1.5rem',
        alignItems: 'center',
        '&:hover': {
            textDecoration: 'underline'
        },
    },

    aboutHeaderLink: {
        display: 'flex',
        justifyContent: 'left',
        flexGrow: 1,
        margin: 0,
        lineHeight: 1.15,
        fontSize: '1.5rem',
        letterSpacing: '4px',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
}));

export default function Header(){
    const router = useRouter()
    const classes = useStyles({'pathname':router.pathname})();
    
   return (
        router.pathname == '/' ?
            <header className={classes.header}>
                <Link href="/explore">
                    <a
                        className={classes.headerLink}
                    >
                        Explore
                    </a>
                </Link>
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
                <Image src="/Logo.svg" alt="Sinagpala Logo" width={36} height={36} className={classes.logo}/>
                <Link href="/">
                    <a
                        className={classes.aboutHeaderLink}
                    >
                        Sinagpala
                    </a>
                </Link>
            </header>
    )
}