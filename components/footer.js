import Link from 'next/link'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    footer: {
        display: 'flex',
        flex: 1,
        padding: '2rem 0',
        borderTop: '1px solid #eaeaea',
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      footerLink: {
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
        alignItems: 'center',
        '&:hover': {
          textDecoration: 'underline'
        },
      },   
}));

export default function Footer(){
    const classes = useStyles();

    return (
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
    )
}